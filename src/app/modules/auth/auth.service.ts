import { ConflictException, Injectable, UnauthorizedException,InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { EmailVerificationService } from '../email-verification/email-verification.service';
import { TenantService } from '../tenant/tenant.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../database/entities/user.entity';
import { SchemeService } from '../scheme/scheme.service';
import { Scheme } from '../../../database/entities/scheme.entity';
import { WinstonLoggerService } from '../../../logger/winston-logger.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly TenantService:TenantService,
    private readonly configService: ConfigService,
    private readonly schemeService: SchemeService,
    private readonly logger: WinstonLoggerService
  ) {}

  // Hash password
  async hashPassword(password: string, saltRounds: number): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  // Validate password
  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Validate user for login
  async validateUser(loginDto: LoginDto): Promise<any> {
    const { email } = loginDto;

    console.log('Validating user with email:', email);

    // Find user by email
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      console.log(`No user found with email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('User found:', user);

    
    console.log('Comparing passwords:');
    // console.log('Input password:', password);
    console.log('Stored password hash:', user.password);

    // const isPasswordValid = await this.validatePassword(password, user.password);
    // if (!isPasswordValid) {
    //   console.log(`Password mismatch for user with email: ${email}`);
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    console.log('Password is valid, returning user data');

    // Return user data excluding the password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }



  
  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const existingUser = await this.usersService.findOneByEmail(createUserDto.email);
    if (existingUser?.status) {
      throw new ConflictException('User already exists with this email');
    }
  
    const existingUserByPhone = await this.usersService.findByPhoneNumber(createUserDto.phoneNumber);
    if (existingUserByPhone?.status) {
      throw new ConflictException('User already exists with this phone number');
    }
  
    let newUser: User | null = null;
  
    try {
      let { schemeId, ...userData } = createUserDto;
  
      // Use default scheme ID from environment if not provided
      if (!schemeId) {
        schemeId = this.configService.get<string>('DEFAULT_SCHEME_ID') || '4bfa5cb0-bb3e-49e1-8b5a-cf7e93218e95';
      }
  
      // Create new user with schemeId
      newUser = await this.usersService.create({
        ...userData,
        schemeId,
      });
  
      // Create corresponding tenant
      const tenant = await this.TenantService.create({
        email: newUser.email,
        username: newUser.username,
        phoneNumber: newUser.phoneNumber,
        schemeId,
        status: true,
      });
  
      // Link tenantId to user
      await this.usersService.update(newUser.id, { tenantId: tenant.id });
  
      // Send registration success email
      await this.emailVerificationService.sendRegistrationSuccessEmail(newUser.email, newUser.username);
  
      return { message: 'User and tenant created successfully' };
  
    } catch (error) {
      if (newUser) {
        await this.usersService.remove(newUser.id);
      }
      throw new InternalServerErrorException(`Registration failed: ${error.message}`);
    }
  }
  
  
  async login(user: any) {
    console.log('Starting login process for:', user.email);
  
    const foundUser = await this.usersService.findOneByEmail(user.email);
    if (!foundUser) {
      console.log(`User not found: ${user.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Check individual verification statuses
    if (!foundUser.emailVerified && !foundUser.phoneNumberVerified) {
      console.log('Both email and phone number are not verified');
      throw new UnauthorizedException('Please verify both email and phone number.');
    }
  
    if (!foundUser.emailVerified) {
      console.log('Email is not verified');
      throw new UnauthorizedException('Please verify your email.');
    }
  
    if (!foundUser.phoneNumberVerified) {
      console.log('Phone number is not verified');
      throw new UnauthorizedException('Please verify your phone number.');
    }
  
    // Check for mandatory re-verification
    if (foundUser.mandatoryVerification) {
      console.log('Mandatory re-verification triggered');
  
      // Update both verifications to false
      await this.usersService.update(foundUser.id, {
        emailVerified: false,
        phoneNumberVerified: false,
      });
  
      throw new UnauthorizedException('Please reverify your email and phone number.');
    }
  
    // Update last login time and date
    const now = new Date();
    const loginTime = now;
    const loginDate = new Date(now.toDateString()); // strips off the time component
  
    await this.usersService.update(foundUser.id, {
      lastLoginTime: loginTime,
      lastLoginDate: loginDate,
    });
  
    // Prepare JWT payload
    const payload = { sub: foundUser.id, email: foundUser.email };
    const access_token = this.jwtService.sign(payload, { expiresIn: '7d' });
  
    // Fetch tenant and scheme details
    let scheme: Scheme | null = null;

    if (foundUser.tenantId) {
      const tenant = await this.TenantService.findOneWithScheme(foundUser.tenantId);
    
      if (tenant?.scheme && !tenant.scheme.scheme_expired) {
  scheme = tenant.scheme;
}
 else {
        console.log('Scheme is expired or not available');
      }
    }
  
    console.log(`Login successful for user: ${foundUser.email}`);
  
    return {
      access_token,
      user: {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        tenantId: foundUser.tenantId,
      },
      scheme, // will be null if expired or not found
    };
  }
  
  
  
  async verifyPhone(phoneNumber: string): Promise<{ message: string }> {
    console.log(`Attempting to verify phone number: ${phoneNumber}`);
  
    const user = await this.usersService.findByPhoneNumber(phoneNumber);
    if (!user) {
      console.log(`User with phone number ${phoneNumber} not found`);
      throw new UnauthorizedException('User not found');
    }
  
    console.log(`User found: ${user.id}, setting phoneNumberVerified = true`);
    const currentDate = new Date();
  
    await this.usersService.updateByEmail(user.email, { phoneNumberVerified: true, phoneNumberVerifiedDate:currentDate });
  
    console.log(`Phone number verification successful for ${phoneNumber}`);
  
    return { message: 'Phone number verified successfully' };
  }
  
  
}

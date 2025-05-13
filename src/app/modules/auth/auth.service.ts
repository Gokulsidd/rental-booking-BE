import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { CreateUserDto } from '../users/dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
    const { email, password } = loginDto;

    console.log('Validating user with email:', email);

    // Find user by email
    const user = await this.usersService.findOne(email);
    if (!user) {
      console.log(`No user found with email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('User found:', user);

    // Compare passwords
    console.log('Comparing passwords:');
    console.log('Input password:', password);
    console.log('Stored password hash:', user.password);

    const isPasswordValid = await this.validatePassword(password, user.password);
    if (!isPasswordValid) {
      console.log(`Password mismatch for user with email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('Password is valid, returning user data');

    // Return user data excluding the password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Register new user
  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const existingUser = await this.usersService.findOne(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists with this email');
    }
   
    const existingUserByPhone = await this.usersService.findByPhoneNumber(createUserDto.phoneNumber);
    if (existingUserByPhone) {
      throw new ConflictException('User already exists with this phone number');
    }
    // Create the user
    await this.usersService.create(createUserDto);
    return { message: 'User created successfully' };
  }

  
  
  async login(user: any) {
    console.log('Starting login process for:', user.email);
  
    const foundUser = await this.usersService.findOne(user.email);
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
  
    // If both are verified
    const payload = { sub: foundUser.id, email: foundUser.email };
    const access_token = this.jwtService.sign(payload, { expiresIn: '7d' });
  
    console.log(`Login successful for user: ${foundUser.email}`);
    return { access_token };
  }
  
  
  
  
  async verifyEmail(email: string): Promise<{ message: string }> {
    console.log(`Attempting to verify email: ${email}`);
  
    const user = await this.usersService.findOne(email);
    if (!user) {
      console.log(`User with email ${email} not found`);
      throw new UnauthorizedException('User not found');
    }
  
    console.log(`User found: ${user.id}, setting emailVerified = true`);

    const currentDate = new Date();
  
    await this.usersService.updateByEmail(email, { emailVerified: true, emailIdVerifiedDate: currentDate });
  
    console.log(`Email verification successful for ${email}`);
  
    return { message: 'Email verified successfully' };
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

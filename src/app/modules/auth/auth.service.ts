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
   

    // Create the user
    await this.usersService.create(createUserDto);
    return { message: 'User created successfully' };
  }

  // Login user and return JWT token
  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token,
    };
  }
}

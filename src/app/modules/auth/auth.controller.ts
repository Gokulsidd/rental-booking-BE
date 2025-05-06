// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user-dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a user and returns JWT if successful.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User registration payload',

  })
  @ApiResponse({
    status: 201,
    description: 'Registration successful',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists with this email',
    schema: {
      example: {
        statusCode: 409,
        message: 'User already exists with this email',
        error: 'Conflict',
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  
  @Post('login')
  @ApiOperation({ 
    summary: 'Login User',
    description: 'Validates user credentials and returns a JWT access token if successful.',
   })
  @ApiBody({ type: LoginDto })
  @ApiResponse({})
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    return this.authService.login(user);
  }
}



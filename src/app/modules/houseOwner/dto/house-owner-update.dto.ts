import {
    IsEmail,
    IsOptional,
    IsString,
    IsBoolean,
    Matches,
  } from 'class-validator';
  import { ApiPropertyOptional } from '@nestjs/swagger';
  
  export class UpdateHouseOwnerDto {
    @ApiPropertyOptional({ example: 'John' })
    @IsOptional()
    @IsString()
    first_name?: string;
  
    @ApiPropertyOptional({ example: 'Doe' })
    @IsOptional()
    @IsString()
    last_name?: string;
  
    @ApiPropertyOptional({ example: 'Richard Doe' })
    @IsOptional()
    @IsString()
    father_name?: string;
  
    @ApiPropertyOptional({ example: 'Mary Doe' })
    @IsOptional()
    @IsString()
    mother_name?: string;
  
    @ApiPropertyOptional({ example: '123456789012' })
    @IsOptional()
    @Matches(/^\d{12}$/, { message: 'Aadhar number must be a 12-digit number' })
    aadhar_no?: string;
  
    @ApiPropertyOptional({ example: '9876543210' })
    @IsOptional()
    @Matches(/^\d{10}$/, { message: 'Primary phone must be a 10-digit number' })
    phone_primary?: string;
  
    @ApiPropertyOptional({ example: '9123456789' })
    @IsOptional()
    @Matches(/^\d{10}$/, { message: 'Secondary phone must be a 10-digit number' })
    phone_secondary?: string;
  
    @ApiPropertyOptional({ example: '0221234567' })
    @IsOptional()
    @IsString()
    landline1?: string;
  
    @ApiPropertyOptional({ example: '0227654321' })
    @IsOptional()
    @IsString()
    landline2?: string;
  
    @ApiPropertyOptional({ example: 'john.doe@example.com' })
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @ApiPropertyOptional({ example: '123 Main Street' })
    @IsOptional()
    @IsString()
    address1?: string;
  
    @ApiPropertyOptional({ example: 'Suite 5B' })
    @IsOptional()
    @IsString()
    address2?: string;
  
    @ApiPropertyOptional({ example: 'Mumbai' })
    @IsOptional()
    @IsString()
    city?: string;
  
    @ApiPropertyOptional({ example: 'Mumbai Suburban' })
    @IsOptional()
    @IsString()
    district?: string;
  
    @ApiPropertyOptional({ example: 'Maharashtra' })
    @IsOptional()
    @IsString()
    state?: string;
  
    @ApiPropertyOptional({ example: '400001' })
    @IsOptional()
    @Matches(/^\d{6}$/, { message: 'Pincode must be a 6-digit number' })
    pincode?: string;
  
    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    residing_address?: boolean;
  }
  
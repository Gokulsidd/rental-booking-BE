import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  houseOwnerId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  tenantId?: number;

  @IsOptional()
  @ApiPropertyOptional({ default: false })
  phoneNumberVerified?: boolean;
  
  
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  emailVerified?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  reverficationTime?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  phoneNumberVerifiedDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  emailIdVerifiedDate?: Date;

  
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  mandatoryVerification?: boolean;

  
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  reVerification?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  createdDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  modifiedDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  createdBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  modifiedBy?: string;


  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ default: true })
  status?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  nonPaidedContactViewed?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  paidedContactViewed?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  paid?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  noOfNonPaidedContact?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  nonPaidContactList?: string;
}

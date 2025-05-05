import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  MinLength,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
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

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  phoneNumberVerifiedDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  emailIdVerifiedDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  nonPaidContactList?: string;

  @ApiProperty()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  nonPaidContactViewed?: number;

  @ApiProperty()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  paidContactViewed?: number;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value ?? null)
  isPaid?: boolean;

  @ApiProperty()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  noOfNonPaidContact?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  modifiedBy: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  MinLength,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  
  password: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiHideProperty()
  @IsOptional()
  @IsUUID()
  @Transform(({ value }) => value ?? null)
  houseOwnerId?: string;

  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  tenantId?: number;

  @ApiHideProperty()
  @IsOptional()
  @IsBoolean()
  phoneNumberVerified?: boolean;

  @ApiHideProperty()
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  reverficationTime?: Date;

  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  phoneNumberVerifiedDate?: Date;

  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  emailIdVerifiedDate?: Date;

  @ApiHideProperty()
  @IsOptional()
  @IsBoolean()
  mandatoryVerification?: boolean;

  @ApiHideProperty()
  @IsOptional()
  @IsBoolean()
  reVerification?: boolean;

  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  createdDate?: Date;

  @ApiHideProperty()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  modifiedDate?: Date;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  createdBy?: string;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  modifiedBy?: string;

  @ApiHideProperty()
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  nonPaidedContactViewed?: number;

  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  paidedContactViewed?: number;

  @ApiHideProperty()
  @IsOptional()
  @IsBoolean()
  paid?: boolean;

  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? null)
  noOfNonPaidedContact?: number;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  nonPaidContactList?: string;
}

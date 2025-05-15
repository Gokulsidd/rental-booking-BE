import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsInt,
    IsDate,
    IsBoolean,
  } from 'class-validator';
  import {
    ApiProperty,
    ApiPropertyOptional,
  } from '@nestjs/swagger';
  import { Transform, Type } from 'class-transformer';
  
  export class CreateSMSVerificationDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @ApiProperty()
    @IsInt()
    @Transform(({ value }) => value ?? null)
    UserId: number;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Phonenumber: string;
  
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    SMSSendDateTime: Date;
  
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    SMSExpiryDateTime: Date;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    Status?: string;
  
    @ApiProperty()
    @IsInt()
    @Transform(({ value }) => value ?? null)
    NoOfVerificationPerDay: number;
  
    @ApiProperty()
    @IsInt()
    @Transform(({ value }) => value ?? null)
    BlockForDays: number;
  
    @ApiProperty()
    @IsInt()
    @Transform(({ value }) => value ?? null)
    BlockAfterAttempt: number;
  
    @ApiProperty()
    @IsInt()
    @Transform(({ value }) => value ?? null)
    TotalNoAttempt: number;
  
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    CreatedOn: Date;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    CreatedBy: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ModifiedBy: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    ModifiedOn?: Date;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    SMSCode?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ?? null)
    LastSMSSendStatus?: boolean;
  }
  
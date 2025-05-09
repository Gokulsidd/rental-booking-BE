import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchemeDto {
  @ApiProperty({ example: 'Basic Rental Scheme' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 12 })
  @IsNotEmpty()
  @IsNumber()
  duration_months: number;

  @ApiProperty({ example: 10.0 })
  @IsNotEmpty()
  @IsNumber()
  discount_percentage: number;

  @ApiProperty({ example: 9999.99 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  for_rental_owner?: boolean;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  for_tenant?: boolean;
}

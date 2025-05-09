import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRentalHouseDetailsDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @IsNotEmpty()
  @IsUUID()
  house_owner_id: string;

  @ApiPropertyOptional({ example: '23B' })
  @IsOptional()
  @IsString()
  flat_no_or_door_no?: string;

  @ApiPropertyOptional({ example: 'A.C.C Street' })
  @IsOptional()
  @IsString()
  address1?: string;

  @ApiPropertyOptional({ example: 'Dharapuram Road' })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiPropertyOptional({ example: 'Near Park' })
  @IsOptional()
  @IsString()
  address3?: string;

  @ApiPropertyOptional({ example: 'Palani Nagar' })
  @IsOptional()
  @IsString()
  area_or_nagar?: string;

  @ApiPropertyOptional({ example: 'Palani' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Dindigul' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({ example: 'Tamil Nadu' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ example: '624602' })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({ example: '1st' })
  @IsOptional()
  @IsString()
  floor?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  vasthu?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  corporation_water?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  bore_water?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  separate_eb?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  two_wheeler_parking?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  four_wheeler_parking?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  separate_house?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  owner_in_same_building?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  rental_occupied?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  apartment?: boolean;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  apartment_floor?: number;

  @ApiPropertyOptional({ example: '2024-05-01' })
  @IsOptional()
  @IsDateString()
  rent_from?: Date;

  @ApiPropertyOptional({ example: '2025-04-30' })
  @IsOptional()
  @IsDateString()
  rent_to?: Date;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  pets_allowed?: boolean;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsNumber()
  bhk: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  bachelor_allowed?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  non_veg_allowed?: boolean;

  @ApiProperty({ example: 60000 })
  @IsNotEmpty()
  @IsNumber()
  deposit: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  payment_active?: boolean;

  @ApiPropertyOptional({ example: '9952401981' })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiPropertyOptional({ example: '9952401982' })
  @IsOptional()
  @IsString()
  phone_number_primary?: string;

  @ApiPropertyOptional({ example: '04545242230' })
  @IsOptional()
  @IsString()
  landline_number?: string;
}

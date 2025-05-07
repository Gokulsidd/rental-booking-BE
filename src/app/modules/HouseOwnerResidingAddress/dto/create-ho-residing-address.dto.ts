import { IsNotEmpty, IsOptional, IsString,  Matches, IsUUID} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHOAddressDto {
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsUUID()
    house_owner_id: string;

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
  
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ default: true })
    status?: boolean;
}

import { IsUUID, IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


    export class CreateRentalHouseViewedHistoryDto {
        @IsUUID()
        @ApiProperty({ example: 'f239ee2d-6d42-42a4-b2c9-3e80c78cd8a2' })
        tenantId: string;
      
        @IsUUID()
        @ApiProperty({ example: '7f8db7b2-935d-4b11-bb12-bb5dba4fddcb' })
        rentalHouseId: string;
      
        @IsUUID()
        @ApiProperty({ example: 'd5a72b4d-62f2-4a5f-b930-4f2fc93d75c6' })
        schemeId: string;
      
        @IsString()
        @ApiProperty({ example: '14:30:00' })
        viewedTime: string;
      
        @IsDateString()
        @ApiProperty({ example: '2025-05-23' })
        viewedDate: string;
      }
      



import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class VerifyPhoneDto {
  @ApiProperty({ example: '9710845877' })
  @IsPhoneNumber()
  phoneNumber: string;
}

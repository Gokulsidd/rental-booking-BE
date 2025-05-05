import { ApiProperty } from '@nestjs/swagger';

export class ApiMetadata {
  @ApiProperty({ example: '1.0' })
  version: string;

  @ApiProperty({ example: '/docs' })
  documentation: string;

  @ApiProperty({ example: 'operational' })
  status: string;

  @ApiProperty({ example: '2023-08-15T12:00:00.000Z' })
  timestamp: string;
}

export class CustomApiResponse {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Welcome to the Rental Booking API' })
  message: string;

  @ApiProperty({ type: ApiMetadata })
  data: ApiMetadata;
}
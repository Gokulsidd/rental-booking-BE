import { Injectable } from '@nestjs/common';
import { CustomApiResponse } from '../common/interfaces/api-response.interface';

@Injectable()
export class AppService {
  getWelcome(): CustomApiResponse {
    return {
      success: true,
      message: 'Welcome to the Rental Booking API',
      data: {
        version: '1.0',
        documentation: '/docs', // Swagger UI path
        status: 'operational',
        timestamp: new Date().toISOString()
      }
    };
  }
}
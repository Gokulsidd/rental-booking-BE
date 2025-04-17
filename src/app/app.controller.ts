import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { CustomApiResponse } from '../common/interfaces/api-response.interface';

@ApiTags('Root') // Groups this endpoint in Swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'API Root Endpoint',
    description: 'Provides welcome message and API metadata'
  })
  @ApiResponse({
    status: 200,
    description: 'Successful API connection',
    type: CustomApiResponse
  })
  getWelcome(): CustomApiResponse {
    return this.appService.getWelcome();
  }
}
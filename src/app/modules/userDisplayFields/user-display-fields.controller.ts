import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserDisplayFieldsService } from './user-display-fields.service';
import { CreateUserDisplayFieldsDto } from './dto/create-user-display-fields.dto';
import { UpdateUserDisplayFieldsDto } from './dto/update-user-display-fields.dto';
import { WinstonLoggerService } from '../../../logger/winston-logger.service';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class VisibleFieldsDto {
    @IsUUID()
    @ApiProperty({ description: 'The UUID of the user' })
    userId: string;
  }

@Controller('user-display-fields')
export class UserDisplayFieldsController {
  constructor(private readonly UserDisplayFieldsService: UserDisplayFieldsService,
    private readonly logger: WinstonLoggerService
) {}

  @Post()
  create(@Body() dto: CreateUserDisplayFieldsDto) {
    return this.UserDisplayFieldsService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.UserDisplayFieldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserDisplayFieldsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDisplayFieldsDto) {
    return this.UserDisplayFieldsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserDisplayFieldsService.remove(id);
  }

  
  
  @Post('visible-fields')
  async getVisibleFields(@Body('userId') userId?: string) {
    if (!userId) {
      this.logger.log('No userId provided. Returning PUBLIC fields.');
      return this.UserDisplayFieldsService.getVisibleFieldsByUserType('PUBLIC');
    }

    this.logger.log(`Getting visible fields for userId: ${userId}`);
    return this.UserDisplayFieldsService.getVisibleFields(userId);
  }
  
}
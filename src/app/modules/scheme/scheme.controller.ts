import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchemeService } from './scheme.service';
import { CreateSchemeDto } from './dto/create-scheme.dto';
import { UpdateSchemeDto } from './dto/update-scheme.dto';
import { ApiTags, ApiOperation, ApiParam ,ApiResponse,ApiBody} from '@nestjs/swagger';


@ApiTags('Scheme')
@Controller('scheme')
export class SchemeController {
  constructor(private readonly SchemeService: SchemeService) {}
 @Post()
    @ApiOperation({ summary: 'create a new Scheme'  })
    @ApiBody({ type: CreateSchemeDto })
    @ApiResponse({ status: 201, description: 'Scheme created successfully' })
    async create(@Body() createShemeDto: CreateSchemeDto) {
        return await this.SchemeService.create(createShemeDto)
    }
    
    
    @Get()
    @ApiOperation({ summary: 'Get all Scheme' })
    // @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'List of Scheme returned' })
    async findAll() {
        return await this.SchemeService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get Scheme by ID' })
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'Scheme returned by ID' })
    async findOneById(@Param('id') id: string) {
        return await this.SchemeService.findOneById(id)
    }

     @Patch(':id')
     @ApiOperation({ summary: 'Update Scheme by ID' })
     @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
     @ApiBody({ type: UpdateSchemeDto })
     @ApiResponse({ status: 200, description: 'Scheme updated successfully' })
     async update(@Param('id') id: string, @Body() updateShemeDto: UpdateSchemeDto) {
     return await this.SchemeService.update(id, updateShemeDto )
     }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete Scheme by ID' })
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'Scheme deleted successfully' })
    async remove(@Param('id') id: string) : Promise<boolean> {
        return await this.SchemeService.remove(id)
    }

}

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,Query,BadRequestException } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../common/guards/auth.guard";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { TenantService } from "./tenant.service";
import { UpdateTenantDto } from "./dto/update-tenant.dto";


@Controller('tenant')
export class TenantController{
  constructor(private readonly TenantService: TenantService) {}

    @Post()
    @ApiOperation({ summary: 'create a new Tenant'  })
    @ApiBody({ type: CreateTenantDto })
    @ApiResponse({ status: 201, description: 'Tenant created successfully' })
    async create(@Body() createUserDto: CreateTenantDto) {
        return await this.TenantService.create(createUserDto)
    }

      @Get()
        @ApiOperation({ summary: 'Get all Tenants' })
        // @ApiBearerAuth('access-token')
        @ApiResponse({ status: 200, description: 'List of Tenant returned' })
        async findAll() {
            return await this.TenantService.findAll();
        }
    
        @Get(':id')
        @ApiOperation({ summary: 'Get Tenant by ID' })
        @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
        @ApiResponse({ status: 200, description: 'Tenant returned by ID' })
        async findOneById(@Param('id') id: string) {
            return await this.TenantService.findOneById(id)
        }
    
         @Patch(':id')
         @ApiOperation({ summary: 'Update Tenant by ID' })
         @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
         @ApiBody({ type: UpdateTenantDto })
         @ApiResponse({ status: 200, description: 'Tenant updated successfully' })
         async update(@Param('id') id: string, @Body() updatRentalHouseDto: UpdateTenantDto) {
         return await this.TenantService.update(id, updatRentalHouseDto )
         }
    
        @Delete(':id')
        @ApiOperation({ summary: 'Delete Tenant by ID' })
        @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
        @ApiResponse({ status: 200, description: 'Tenant deleted successfully' })
        async remove(@Param('id') id: string) : Promise<boolean> {
            return await this.TenantService.remove(id)
        }
      
        
}
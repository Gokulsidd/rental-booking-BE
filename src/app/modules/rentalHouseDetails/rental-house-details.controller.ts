import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../common/guards/auth.guard";
import { CreateRentalHouseDetailsDto } from "./dto/create-rental-house-details.dto";
import { UpdateRentalHouseDetailsDto } from "./dto/update-rental-house-details.dto";
import { RentalHouseDetailsService } from "./rental-house-details.service";

@Controller('rental-house-details')
export class RentalHouseDetailsController {
  constructor(private readonly RentalHouseDetailsService: RentalHouseDetailsService) {}

    @Post()
    @ApiOperation({ summary: 'create a new RentalHouseDetails'  })
    @ApiBody({ type: CreateRentalHouseDetailsDto })
    @ApiResponse({ status: 201, description: 'RentalHouseDetails created successfully' })
    async create(@Body() createUserDto: CreateRentalHouseDetailsDto) {
        return await this.RentalHouseDetailsService.create(createUserDto)
    }
    
    
    @Get()
    @ApiOperation({ summary: 'Get all RentalHouseDetails' })
    // @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'List of RentalHouseDetails returned' })
    async findAll() {
        return await this.RentalHouseDetailsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get RentalHouseDetails by ID' })
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'RentalHouseDetails returned by ID' })
    async findOneById(@Param('id') id: string) {
        return await this.RentalHouseDetailsService.findOneById(id)
    }

     @Patch(':id')
     @ApiOperation({ summary: 'Update RentalHouseDetails by ID' })
     @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
     @ApiBody({ type: UpdateRentalHouseDetailsDto })
     @ApiResponse({ status: 200, description: 'RentalHouseDetails updated successfully' })
     async update(@Param('id') id: string, @Body() updatRentalHouseDto: UpdateRentalHouseDetailsDto) {
     return await this.RentalHouseDetailsService.update(id, updatRentalHouseDto )
     }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete RentalHouseDetails by ID' })
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'RentalHouseDetails deleted successfully' })
    async remove(@Param('id') id: string) : Promise<boolean> {
        return await this.RentalHouseDetailsService.remove(id)
    }

   
}
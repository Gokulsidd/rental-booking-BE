import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,Query,BadRequestException } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../common/guards/auth.guard";
import { CreateRentalHouseViewedHistoryDto } from "./dto/create-rental-house-viewed-history.dto";
import { UpdateRentalHouseViewedHistoryDto } from "./dto/update-rental-house-viewed-history.dto";
import { RentalHouseViewedHistoryService } from "../rentalHouse-viewed-history/rh-viewed-history.service";

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('rental-house-viewed-history')
export class RentalHouseViewedHistoryController {
  constructor(private readonly RentalHouseViewedHistoryService: RentalHouseViewedHistoryService) {}

    @Post()
    @ApiOperation({ summary: 'create a new RentalHouse Viewed History'  })
    @ApiBody({ type: CreateRentalHouseViewedHistoryDto })
    @ApiResponse({ status: 201, description: 'RentalHouse Viewed History created successfully' })
    async create(@Body() CreateRentalHouseViewedHistoryDto: CreateRentalHouseViewedHistoryDto) {
        return await this.RentalHouseViewedHistoryService.create(CreateRentalHouseViewedHistoryDto)
    }
    
    
    @Get()
    @ApiOperation({ summary: 'Get all RentalHouse Viewed History' })
    // @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'List of RentalHouse Viewed History returned' })
    async findAll() {
        return await this.RentalHouseViewedHistoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get RentalHouse Viewed History by ID' })
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'RentalHouse Viewed History returned by ID' })
    async findOneById(@Param('id') id: string) {
        return await this.RentalHouseViewedHistoryService.findOneById(id)
    }

     @Patch(':id')
     @ApiOperation({ summary: 'Update RentalHouse Viewed History by ID' })
     @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
     @ApiBody({ type: UpdateRentalHouseViewedHistoryDto })
     @ApiResponse({ status: 200, description: 'RentalHouse Viewed History updated successfully' })
     async update(@Param('id') id: string, @Body() updatRentalHouseDto: UpdateRentalHouseViewedHistoryDto) {
     return await this.RentalHouseViewedHistoryService.update(id, updatRentalHouseDto )
     }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete RentalHouseViewedHistory by ID' })
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'RentalHouse Viewed History deleted successfully' })
    async remove(@Param('id') id: string) : Promise<boolean> {
        return await this.RentalHouseViewedHistoryService.remove(id)
    }
  

    
}
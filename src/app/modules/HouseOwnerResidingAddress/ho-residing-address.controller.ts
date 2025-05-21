import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateHOAddressDto } from "./dto/create-ho-residing-address.dto";
import { UpdateHOAddressDto } from "./dto/update-ho-residing-address.dto";
import { HouseOwnerResidingAddressService } from "./ho-residing-address.service";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../common/guards/auth.guard";


@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('HouseOwner Residing Address')
@Controller('house-owner/residing-address')
export class HouseOwnerResidingAddressController {
    constructor(private readonly HouseOwnerResidingAddressService: HouseOwnerResidingAddressService ) {}

    @Post()
    @ApiOperation({ summary: 'create a new HouseOwnerResidingAddress'  })
    @ApiBody({ type: CreateHOAddressDto })
    @ApiResponse({ status: 201, description: 'HouseOwnerResidingAddress created successfully' })
    async create(@Body() CreateHOAddressDto: CreateHOAddressDto) {
        return await this.HouseOwnerResidingAddressService.create(CreateHOAddressDto)
    }
    
    
    @Get('all')
    @ApiOperation({ summary: 'Get all HouseOwnerResidingAddress' })
    @ApiResponse({ status: 200, description: 'List of HouseOwnerResidingAddress returned' })
    async findAll() {
        return await this.HouseOwnerResidingAddressService.findAll();
    }

   

    @Get(':id')
    @ApiOperation({ summary: 'Get HouseOwnerResidingAddress by ID' })
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'HouseOwnerResidingAddress returned by ID' })
    async findOneById(@Param('id') id: string) {
        return await this.HouseOwnerResidingAddressService.findOneById(id)
    }

     @Patch(':id')
     @ApiOperation({ summary: 'Update HouseOwnerResidingAddress by ID' })
     @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
     @ApiBody({ type: UpdateHOAddressDto })
     @ApiResponse({ status: 200, description: 'HouseOwnerResidingAddress updated successfully' })
     async update(@Param('id') id: string, @Body() updateHOADto: UpdateHOAddressDto) {
     return await this.HouseOwnerResidingAddressService.update(id, updateHOADto )
     }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete HouseOwnerResidingAddress by ID' })
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'HouseOwnerResidingAddress deleted successfully' })
    async remove(@Param('id') id: string) : Promise<boolean> {
        return await this.HouseOwnerResidingAddressService.remove(id)
    }

   
}
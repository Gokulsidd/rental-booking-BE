import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../common/guards/auth.guard";
import { HouseOwnerService } from "./house-owner.service";
import { CreateHouseOwnerDto } from "./dto/house-owner-create.dto";
import { UpdateHouseOwnerDto } from "./dto/house-owner-update.dto";

@Controller('house-owner')
export class HouseOwnerController {
  constructor(private readonly HouseOwnerService: HouseOwnerService) {}

  @Post()
  @ApiOperation({ summary: 'create a new HouseOwner'  })
  @ApiBody({ type: CreateHouseOwnerDto })
  @ApiResponse({ status: 201, description: 'HouseOwner created successfully' })
  async create(@Body() CreateHouseOwnerDto: CreateHouseOwnerDto) {
  return await this.HouseOwnerService.create(CreateHouseOwnerDto)
  }
      
  // @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all HouseOwners' })
  // @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'List of HouseOwner returned' })
  async findAll() {
  return await this.HouseOwnerService.findAll();
  }
 
  @Get(':id')
  @ApiOperation({ summary: 'Get HouseOwner owner by ID' })
  @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
  @ApiResponse({ status: 200, description: 'HouseOwner returned by ID' })
  async findOneById(@Param('id') id: string) {
      return await this.HouseOwnerService.findOneById(id)
  }


 @Patch(':id')
 @ApiOperation({ summary: 'Update HouseOwner by ID' })
 @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
 @ApiBody({ type: UpdateHouseOwnerDto })
 @ApiResponse({ status: 200, description: 'HouseOwner updated successfully' })
 async update(@Param('id') id: string, @Body() UpdateHouseOwnerDto: UpdateHouseOwnerDto) {
 return await this.HouseOwnerService.update(id, UpdateHouseOwnerDto )
 }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete HouseOwner by ID (Soft Delete)' })
  @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
  @ApiResponse({ status: 200, description: 'HouseOwner deleted successfully' })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.HouseOwnerService.remove(id);
  }

}
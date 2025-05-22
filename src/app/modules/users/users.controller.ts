import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user-dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user-dto";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../common/guards/auth.guard";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService ) {}

    @Post()
    @ApiOperation({ summary: 'create a new user'  })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'List of users returned' })
    async findAll() {
        return await this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
     @ApiBearerAuth('access-token')
    @Get('by-email/:email')
    @ApiParam({ name: 'email', example: 'example@gmail.com' })
    @ApiResponse({ status: 200, description: 'List of users returned' })
    async findOneByEmail(@Param('email') email: string) {
      return this.usersService.findOneByEmail(email);
    }
    
    @UseGuards(JwtAuthGuard)
     @ApiBearerAuth('access-token')
    @Get('by-id/:id')
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'user returned' })
    async findOneById(@Param('id') id: string) {
      return this.usersService.findOneById(id);
    }
    

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
     @Patch(':id')
     @ApiOperation({ summary: 'Update user by ID' })
     @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
     @ApiBody({ type: UpdateUserDto })
     @ApiResponse({ status: 200, description: 'user updated successfully' })
     async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
     return await this.usersService.update(id, updateUserDto )
     }

     @UseGuards(JwtAuthGuard)
     @ApiBearerAuth('access-token')
    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', example: '1b1c0f92-xxxx-xxxx-xxxx' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    async remove(@Param('id') id: string) : Promise<boolean> {
        return await this.usersService.remove(id)
    }

   
}
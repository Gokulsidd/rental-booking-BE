import { Injectable, BadRequestException, NotFoundException,ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseOwnerDto } from './dto/house-owner-create.dto';
import { UpdateHouseOwnerDto } from './dto/house-owner-update.dto';
import { HouseOwner } from '../../../database/entities/house-owner.entity';
import { User } from '../../../database/entities/user.entity';
import { WinstonLoggerService } from '../../../logger/winston-logger.service';

@Injectable()
export class HouseOwnerService {
  constructor(
    @InjectRepository(HouseOwner)
    private houseOwnerRepo: Repository<HouseOwner>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly logger: WinstonLoggerService
  ) {}

  async create(dto: CreateHouseOwnerDto) {
    const existingByPhone = await this.houseOwnerRepo.findOne({
      where: { phone_primary: dto.phone_primary },
    });
  
    if (existingByPhone) {
      throw new ConflictException('House owner already exists with this phone number');
    }
  
    if (dto.aadhar_no) {
      const existingByAadhar = await this.houseOwnerRepo.findOne({
        where: { aadhar_no: dto.aadhar_no },
      });
      if (existingByAadhar) {
        throw new ConflictException('House owner already exists with this Aadhar number');
      }
    }
  
    if (dto.email) {
      const existingByEmail = await this.houseOwnerRepo.findOne({
        where: { email: dto.email },
      });
      if (existingByEmail) {
        throw new ConflictException('House owner already exists with this email address');
      }
    }
  
    const houseOwner = this.houseOwnerRepo.create(dto);
    const savedHouseOwner = await this.houseOwnerRepo.save(houseOwner);

    // 👉 Update the user if emails match
    if (dto.email) {
      const user = await this.userRepo.findOne({ where: { email: dto.email } });
      console.log('User found:', user);
    
      if (user) {
        user.houseOwnerId = savedHouseOwner.id;
        await this.userRepo.save(user);
        console.log('User updated with houseOwnerId:', user.houseOwnerId);
      }
    }
    return savedHouseOwner;
  }
  
  
  
  findAll() {
    return this.houseOwnerRepo.find({ where: { isActive: true } });
  }

  findOneById(id: string) {
    return this.houseOwnerRepo.findOne({ where: { id, isActive: true } }); 
  }

  async update(id: string, dto: UpdateHouseOwnerDto) {
    await this.houseOwnerRepo.update(id, dto); 
    return this.findOneById(id);
  }

  async remove(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }

    const houseOwner = await this.houseOwnerRepo.findOne({ where: { id, isActive: true } });
    if (!houseOwner) {
      throw new NotFoundException(`HouseOwner with ID ${id} not found.`);
    }

    const result = await this.houseOwnerRepo.update(id, { isActive: false });
    return (result.affected ?? 0) > 0;
  }
}

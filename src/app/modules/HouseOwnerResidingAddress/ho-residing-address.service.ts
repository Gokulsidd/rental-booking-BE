import { Injectable, BadRequestException, NotFoundException,ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHOAddressDto } from './dto/create-ho-residing-address.dto';
import { UpdateHOAddressDto } from './dto/update-ho-residing-address.dto';
import { HouseOwnerResidingAddress } from '../../../database/entities/house-owner-residing-address.entity';


@Injectable()
export class HouseOwnerResidingAddressService {
  constructor(
    @InjectRepository(HouseOwnerResidingAddress)
    private readonly addressRepo: Repository<HouseOwnerResidingAddress>,
  ) {}



  async create(dto: CreateHOAddressDto) {
    const address = this.addressRepo.create({
      ...dto,
      house_owner: { id: dto.house_owner_id }, 
    });
  
    return this.addressRepo.save(address);
  }
  
  
  async findAll() {
    return await this.addressRepo.find({ where: { status: true } });
  }


  async findOneById(id: string) {
    return await this.addressRepo.findOne({ where: { id } });
  }

   async update(id: string, UpdateHOAddressDto: UpdateHOAddressDto) {
        await this.addressRepo.update(id, UpdateHOAddressDto); 
        return this.findOneById(id);
      }
  
     async remove(id: string): Promise<boolean> {
        if (!id) {
          throw new BadRequestException('ID must be provided');
        }
    
        const residingAddress = await this.addressRepo.findOne({ where: { id, status: true } });
        if (!residingAddress) {
          throw new NotFoundException(`User with ID ${id} not found.`);
        }
    
        const result = await this.addressRepo.update(id, { status : false });
        return (result.affected ?? 0) > 0;
      }
}

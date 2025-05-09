import { Injectable, BadRequestException, NotFoundException,ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRentalHouseDetailsDto } from './dto/create-rental-house-details.dto';
import { UpdateRentalHouseDetailsDto } from './dto/update-rental-house-details.dto';
import { RentalHouseDetails } from '../../../database/entities/rental-house-details.entity'

@Injectable()
export class RentalHouseDetailsService {
    constructor(
      @InjectRepository(RentalHouseDetails)
      private rentalRepo: Repository<RentalHouseDetails>,
    ) {}

  async create(dto: CreateRentalHouseDetailsDto) {
     const address = this.rentalRepo.create({
       ...dto,
       house_owner: { id: dto.house_owner_id }, 
     });
   
     return this.rentalRepo.save(address);
   }
   
  
  findAll() {
    return this.rentalRepo.find({ where: { isActive: true } });
  }

  findOneById(id: string) {
    return this.rentalRepo.findOne({ where: { id, isActive: true } }); 
  }

  async update(id: string, UpdateRentalHouseDetailsDto: UpdateRentalHouseDetailsDto) {
    await this.rentalRepo.update(id, UpdateRentalHouseDetailsDto); 
    return this.findOneById(id);
  }

  

  async remove(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }

    const retalHouse = await this.rentalRepo.findOne({ where: { id, isActive: true } });
    if (!retalHouse) {
      throw new NotFoundException(`CreateRentalHouseDetails with ID ${id} not found.`);
    }

    const result = await this.rentalRepo.update(id, { isActive: false });
    return (result.affected ?? 0) > 0;
  }
}

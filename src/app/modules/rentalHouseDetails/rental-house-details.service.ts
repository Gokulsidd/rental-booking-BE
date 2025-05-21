import { Injectable, BadRequestException, NotFoundException,ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRentalHouseDetailsDto } from './dto/create-rental-house-details.dto';
import { UpdateRentalHouseDetailsDto } from './dto/update-rental-house-details.dto';
import { RentalHouseDetails } from '../../../database/entities/rental-house-details.entity';
import { Like,Brackets } from 'typeorm';


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

//   async search(query: string): Promise<RentalHouseDetails[]> {
//     return this.rentalRepo.find({
//       where: [
//         { city: Like(`%${query}%`), isActive: true },
//         { area: Like(`%${query}%`), isActive: true },
//         { address1: Like(`%${query}%`), isActive: true },
//         { address2: Like(`%${query}%`), isActive: true },
//         { address3: Like(`%${query}%`), isActive: true },
//         { district: Like(`%${query}%`), isActive: true },
//       ],
//       order: { city: 'ASC' },
//     });
//   }

async search(query: string): Promise<RentalHouseDetails[]> {
    const results = await this.rentalRepo.createQueryBuilder('rental')
      .where('rental.isActive = :active', { active: true })
      .andWhere(new Brackets(qb => {
        qb.where('rental.city LIKE :query', { query: `%${query}%` })
          .orWhere('rental.area LIKE :query', { query: `%${query}%` })
          .orWhere('rental.address1 LIKE :query', { query: `%${query}%` })
          .orWhere('rental.address2 LIKE :query', { query: `%${query}%` })
          .orWhere('rental.address3 LIKE :query', { query: `%${query}%` })
          .orWhere('rental.district LIKE :query', { query: `%${query}%` });
      }))
      .orderBy('rental.city', 'ASC')
      .getMany();

    console.log('Search results:', results); 
    return results;
  }
  
}

import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Scheme} from '../../../database/entities/scheme.entity';
import { CreateSchemeDto } from './dto/create-scheme.dto';
import { UpdateSchemeDto } from './dto/update-scheme.dto';

@Injectable()
export class SchemeService {
  constructor(
    @InjectRepository(Scheme)
    private readonly schemeRepo: Repository<Scheme>,
  ) {}

  async create(dto: CreateSchemeDto) {
      const address = this.schemeRepo.create(dto);
    
      return this.schemeRepo.save(address);
    }
    
   
   findAll() {
     return this.schemeRepo.find({ where: { isActive: true } });
   }
 
   findOneById(id: string) {
     return this.schemeRepo.findOne({ where: { id, isActive: true } }); 
   }
 
   async update(id: string, UpdateSchemeDto: UpdateSchemeDto) {
     await this.schemeRepo.update(id, UpdateSchemeDto); 
     return this.findOneById(id);
   }
 
   
 
   async remove(id: string): Promise<boolean> {
     if (!id) {
       throw new BadRequestException('ID must be provided');
     }
 
     const retalHouse = await this.schemeRepo.findOne({ where: { id, isActive: true } });
     if (!retalHouse) {
       throw new NotFoundException(`CreateRentalHouseDetails with ID ${id} not found.`);
     }
 
     const result = await this.schemeRepo.update(id, { isActive: false });
     return (result.affected ?? 0) > 0;
   }
}

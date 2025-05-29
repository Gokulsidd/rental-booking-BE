import { Injectable, BadRequestException, NotFoundException,ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { Tenant } from '../../../database/entities/tenant.entity';
import { Like,Brackets } from 'typeorm';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
    constructor(
      @InjectRepository(Tenant)
      private tenantRepo: Repository<Tenant>,
    ) {}

  async create(dto: CreateTenantDto) {
     const address = this.tenantRepo.create({
       ...dto,
     
     });
   
     return this.tenantRepo.save(address);
   }
   
   findAll() {
      return this.tenantRepo.find({ where: { status: true } });
    }
  
    findOneById(id: string) {
      return this.tenantRepo.findOne({ where: { id, status: true } }); 
    }
  
    async update(id: string, UpdateRentalHouseDetailsDto: UpdateTenantDto) {
      await this.tenantRepo.update(id, UpdateRentalHouseDetailsDto); 
      return this.findOneById(id);
    }
  
    
  
    async remove(id: string): Promise<boolean> {
      if (!id) {
        throw new BadRequestException('ID must be provided');
      }
  
      const retalHouse = await this.tenantRepo.findOne({ where: { id, status: true } });
      if (!retalHouse) {
        throw new NotFoundException(`Tenant with ID ${id} not found.`);
      }
  
      const result = await this.tenantRepo.update(id, { status: false });
      return (result.affected ?? 0) > 0;
    }
 
    async findOneWithScheme(id: string) {
      return this.tenantRepo.findOne({
        where: { id },
        relations: ['scheme'], // Ensure scheme is a defined relation
      });
    }
  }

  

 
  


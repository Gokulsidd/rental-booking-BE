import { Injectable, BadRequestException, NotFoundException,ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRentalHouseViewedHistoryDto } from './dto/create-rental-house-viewed-history.dto';
import { RentalHouseViewedHistory } from '../../../database/entities/rental-house-viewed-history.entity';
import { UpdateRentalHouseViewedHistoryDto } from './dto/update-rental-house-viewed-history.dto';



@Injectable()
export class RentalHouseViewedHistoryService{
    constructor(
      @InjectRepository(RentalHouseViewedHistory)
      private RHviewedHistoryRepo: Repository<RentalHouseViewedHistory>,
    ) {}

    async create(dto: CreateRentalHouseViewedHistoryDto) {
      const address = this.RHviewedHistoryRepo.create({
        viewedTime: dto.viewedTime,
        viewedDate: dto.viewedDate,
        tenant: { id: dto.tenantId },            
        rentalHouse: { id: dto.rentalHouseId },  
        scheme: { id: dto.schemeId },  
      });
    
      return this.RHviewedHistoryRepo.save(address);
    }
    
   
  
  findAll() {
    return this.RHviewedHistoryRepo.find({ where: { status: true } });
  }

  findOneById(id: string) {
    return this.RHviewedHistoryRepo.findOne({ where: { id, status: true } }); 
  }

  async update(id: string, UpdateRentalHouseViewedHistoryDto: UpdateRentalHouseViewedHistoryDto) {
    await this.RHviewedHistoryRepo.update(id, UpdateRentalHouseViewedHistoryDto); 
    return this.findOneById(id);
  }

  

  async remove(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }

    const retalHouse = await this.RHviewedHistoryRepo.findOne({ where: { id, status: true } });
    if (!retalHouse) {
      throw new NotFoundException(`RentalHouseDetails with ID ${id} not found.`);
    }

    const result = await this.RHviewedHistoryRepo.update(id, { status: false });
    return (result.affected ?? 0) > 0;
  }


  
}
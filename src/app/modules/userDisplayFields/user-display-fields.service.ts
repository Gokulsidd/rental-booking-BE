import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { CreateUserDisplayFieldsDto } from './dto/create-user-display-fields.dto';
  import { UpdateUserDisplayFieldsDto } from './dto/update-user-display-fields.dto';
  import { UserDisplayFields } from '../../../database/entities/user-display-fields.entity';
  import { UsersService } from '../users/users.service';
  import { TenantService } from '../tenant/tenant.service';
  import { WinstonLoggerService } from '../../../logger/winston-logger.service';
  
  @Injectable()
  export class UserDisplayFieldsService {
    constructor(
      @InjectRepository(UserDisplayFields)
      private readonly repository: Repository<UserDisplayFields>,
      private readonly usersService: UsersService,
      private readonly tenantService: TenantService,
      private readonly logger: WinstonLoggerService,
    ) {}
  
    create(dto: CreateUserDisplayFieldsDto) {
      const entry = this.repository.create(dto);
      return this.repository.save(entry);
    }
  
    findAll() {
      return this.repository.find();
    }
  
    findOne(id: string) {
      return this.repository.findOneBy({ id });
    }
  
    async update(id: string, dto: UpdateUserDisplayFieldsDto) {
      await this.repository.update(id, dto);
      return this.findOne(id);
    }
  
    async remove(id: string) {
      const record = await this.findOne(id);
      if (!record) throw new NotFoundException('Record not found');
      return this.repository.remove(record);
    }
 

    async getUserType(userId: string): Promise<'PUBLIC' | 'NON_PAID' | 'PAID'> {
        this.logger.log(`Fetching user type for userId: ${userId}`);
        const user = await this.usersService.findOneById(userId);
        if (!user) {
          this.logger.warn(`User not found: ${userId}`);
          throw new UnauthorizedException('User not found');
        }
    
        if (!user.tenantId) {
          this.logger.log(`User ${userId} has no tenantId, userType = NON_PAID`);
          return 'NON_PAID';
        }
    
        const tenant = await this.tenantService.findOneWithScheme(user.tenantId);
        const isPaid = tenant?.scheme && !tenant.scheme.scheme_expired;
        this.logger.log(`Tenant scheme check for userId ${userId}: isPaid=${isPaid}`);
    
        return isPaid ? 'PAID' : 'NON_PAID';
      }
    
      async getVisibleFields(userId: string): Promise<string[]> {
        const userType = await this.getUserType(userId);
        return this.getVisibleFieldsByUserType(userType);
      }
    
      async getVisibleFieldsByUserType(userType: 'PUBLIC' | 'NON_PAID' | 'PAID'): Promise<string[]> {
        this.logger.log(`Fetching fields for userType: ${userType}`);
        const fields = await this.repository.find({
          where: { userType },
          order: { fieldName: 'ASC' },
        });
    
        this.logger.log(`Fields found: ${JSON.stringify(fields)}`);
    
        return fields.map((f) => f.fieldName);
      }
  }
  
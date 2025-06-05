import { Injectable,BadRequestException, NotFoundException  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { WinstonLoggerService } from '../../../logger/winston-logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly logger: WinstonLoggerService
    
  ) {}

  async create(createUserDto: CreateUserDto) {
    const saltRounds = parseInt(this.configService.get('AUTH.saltRounds') || '');
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds)

    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find({ where: { status: true } });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email, status: true } });
  }
  
  async findOneById(id: string) {
    return this.userRepository.findOne({ where: { id, status: true } });
  }
  

   async update(id: string, updateUserDto: UpdateUserDto) {
      await this.userRepository.update(id, updateUserDto); 
      return this.findOneById(id);
    }

   async remove(id: string): Promise<boolean> {
      if (!id) {
        throw new BadRequestException('ID must be provided');
      }
  
      const houseOwner = await this.userRepository.findOne({ where: { id, status: true } });
      if (!houseOwner) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
  
      const result = await this.userRepository.update(id, { status : false });
      return (result.affected ?? 0) > 0;
    }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phoneNumber } });
  }
  

  async updateByEmail(email: string, updateData: Partial<User>): Promise<void> {
    await this.userRepository.update({ email }, updateData);
  }
  
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { User } from '../../../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
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
    return await this.userRepository.find();
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto ) {
    const updatedUser = {
        ...updateUserDto
    }

    return await this.userRepository.update(id, updatedUser)
  }

  async remove(id: string) {
    return await this.userRepository.delete({ id });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phoneNumber } });
  }
  

  async updateByEmail(email: string, updateData: Partial<User>): Promise<void> {
    await this.userRepository.update({ email }, updateData);
  }
  
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerification } from '../../../database/entities/email-verification.entity';
import { Repository } from 'typeorm';
import { SendEmailOtpDto } from './dto/send-email-otp.dto';
import { VerifyEmailOtpDto } from './dto/verify-email-otp.dto';
import { UsersService } from '../users/users.service';
import * as dayjs from 'dayjs';

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailRepo: Repository<EmailVerification>,
    private readonly usersService: UsersService,
  ) {}

  async sendOtp(dto: SendEmailOtpDto) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryMinutes = Number(process.env.EMAIL_OTP_EXPIRY_MINUTES || 10);
    const expiry = dayjs().add(expiryMinutes, 'minute').toDate();

    const user = await this.usersService.findOne(dto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const entity = this.emailRepo.create({
      email: dto.email,
      otp,
      expiresAt: expiry,
      createdBy: dto.createdBy,
    });

    await this.emailRepo.save(entity);

    const template = process.env.EMAIL_TEMPLATE || '';
    const emailBody = template
      .replace('{{USERNAME}}', user.username)
      .replace('{{OTP}}', otp)
      .replace('{{EXPIRY}}', expiryMinutes.toString());

    return {
      message: 'OTP generated successfully',
      email: dto.email,
      emailTemplatePreview: emailBody, 
    };
  }

  async verifyOtp(dto: VerifyEmailOtpDto) {
    const record = await this.emailRepo.findOne({
      where: { email: dto.email, status: 'SENT' },
      order: { expiresAt: 'DESC' },
    });

    if (!record) {
      throw new BadRequestException('No OTP found for this email');
    }

    if (record.otp !== dto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > record.expiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    record.status = 'VERIFIED';
    await this.emailRepo.save(record);

    await this.usersService.updateByEmail(dto.email, {
      emailVerified: true,
      emailIdVerifiedDate: new Date(),
    });

    return { message: 'Email verified successfully' };
  }
}

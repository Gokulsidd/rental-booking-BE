import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { EmailVerification } from '../../../database/entities/email-verification.entity';
import { SendEmailOtpDto } from './dto/send-email-otp.dto';
import { VerifyEmailOtpDto } from './dto/verify-email-otp.dto';
import { UsersService } from '../users/users.service';
import { transporter } from '../../../config/nodemailer.config';
import * as fs from 'fs';
import * as path from 'path';

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

    const templatePath = path.join(__dirname, 'templates', 'otp-email.template.html');
    let template = fs.readFileSync(templatePath, 'utf-8');
    template = template
      .replace('{{USERNAME}}', user.username)
      .replace('{{OTP}}', otp)
      .replace('{{EXPIRY}}', expiryMinutes.toString());

    // Send mail with Nodemailer
    await transporter.sendMail({
      from: `"Rental Booking" <${process.env.GMAIL_USER}>`,
      to: dto.email,
      subject: 'Your OTP Code',
      html: template,
    });

    return {
      message: 'OTP sent successfully',
      email: dto.email,
    };
  }

  async verifyOtp(dto: VerifyEmailOtpDto) {
    const record = await this.emailRepo.findOne({
      where: { email: dto.email, status: 'SENT' },
      order: { expiresAt: 'DESC' },
    });

    if (!record) throw new BadRequestException('No OTP found for this email');
    if (record.otp !== dto.otp) throw new BadRequestException('Invalid OTP');
    if (new Date() > record.expiresAt) throw new BadRequestException('OTP has expired');

    record.status = 'VERIFIED';
    await this.emailRepo.save(record);

    await this.usersService.updateByEmail(dto.email, {
      emailVerified: true,
      emailIdVerifiedDate: new Date(),
    });

    return { message: 'Email verified successfully' };
  }

  async sendRegistrationSuccessEmail(email: string, username: string): Promise<void> {
    const templatePath = path.join(__dirname, 'templates', 'registration-success.template.html');
  
    const template = fs.readFileSync(templatePath, 'utf-8')
      .replace('{{USERNAME}}', username);
  
    await transporter.sendMail({
      from: `"Rental Booking" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Registration Successful',
      html: template,
    });
  }
  
}

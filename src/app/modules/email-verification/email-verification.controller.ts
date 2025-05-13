import { Body, Controller, Post } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { SendEmailOtpDto } from './dto/send-email-otp.dto';
import { VerifyEmailOtpDto } from './dto/verify-email-otp.dto';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailService: EmailVerificationService) {}

  @Post('send-otp')
  sendOtp(@Body() dto: SendEmailOtpDto) {
    return this.emailService.sendOtp(dto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyEmailOtpDto) {
    return this.emailService.verifyOtp(dto);
  }
}

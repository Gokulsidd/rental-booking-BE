import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailVerificationController } from "./email-verification.controller";
import { EmailVerificationService } from "./email-verification.service";
import { EmailVerification } from "../../../database/entities/email-verification.entity";
import { UsersModule } from "../users/users.module";
import { LoggerModule } from "../../../logger/logger.module";

@Module({
    imports: [TypeOrmModule.forFeature([EmailVerification]),UsersModule,LoggerModule],
    controllers: [EmailVerificationController],
    providers:[EmailVerificationService],
    exports: [EmailVerificationService]
})

export class EmailVerificationModule {}
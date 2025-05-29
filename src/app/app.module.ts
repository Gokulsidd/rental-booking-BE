import { Module } from '@nestjs/common';
import { CustomConfigModule } from '../config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HouseOwnerModule } from './modules/houseOwner/house-owner.module';
import { HouseOwnerResidingAddressModule } from './modules/HouseOwnerResidingAddress/ho-residing-address.module';
import { RentalHouseDetailsModule } from './modules/rentalHouseDetails/rental-house-details.module';
import { SchemeModule } from './modules/scheme/scheme.module';
import { EmailVerificationModule } from './modules/email-verification/email-verification.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { RentalHouseViewedHistoryModule } from './modules/rentalHouse-viewed-history/rh-viewed-module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [CustomConfigModule, DatabaseModule, AuthModule, UsersModule, HouseOwnerModule, HouseOwnerResidingAddressModule,RentalHouseDetailsModule,
    SchemeModule, EmailVerificationModule, TenantModule, RentalHouseViewedHistoryModule,LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

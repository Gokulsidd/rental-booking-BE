import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalHouseDetails } from "../../../database/entities/rental-house-details.entity";
import { RentalHouseDetailsService } from "./rental-house-details.service";
import { RentalHouseDetailsController } from "./rental-house-details.controller";
import { LoggerModule } from "../../../logger/logger.module";
@Module({
    imports: [TypeOrmModule.forFeature([RentalHouseDetails]),LoggerModule],
    controllers: [RentalHouseDetailsController],
    providers:[RentalHouseDetailsService],
    exports: [RentalHouseDetailsService]
})

export class RentalHouseDetailsModule {}
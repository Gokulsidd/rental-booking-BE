import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalHouseViewedHistory } from "../../../database/entities/rental-house-viewed-history.entity";
import { RentalHouseViewedHistoryService } from "../rentalHouse-viewed-history/rh-viewed-history.service";
import { RentalHouseViewedHistoryController } from "../rentalHouse-viewed-history/rh-viewed-controller";
import { LoggerModule } from "../../../logger/logger.module";
@Module({
    imports: [TypeOrmModule.forFeature([RentalHouseViewedHistory]),LoggerModule],
    controllers: [RentalHouseViewedHistoryController],
    providers:[RentalHouseViewedHistoryService],
    exports: [RentalHouseViewedHistoryService]
})

export class RentalHouseViewedHistoryModule {}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalHouseViewedHistory } from "../../../database/entities/rental-house-viewed-history.entity";
import { RentalHouseViewedHistoryService } from "../rentalHouse-viewed-history/rh-viewed-history.service";
import { RentalHouseViewedHistoryController } from "../rentalHouse-viewed-history/rh-viewed-controller";
@Module({
    imports: [TypeOrmModule.forFeature([RentalHouseViewedHistory])],
    controllers: [RentalHouseViewedHistoryController],
    providers:[RentalHouseViewedHistoryService],
    exports: [RentalHouseViewedHistoryService]
})

export class RentalHouseViewedHistoryModule {}
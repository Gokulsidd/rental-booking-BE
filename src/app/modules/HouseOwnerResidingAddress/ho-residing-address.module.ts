import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HouseOwnerResidingAddressService} from "../HouseOwnerResidingAddress/ho-residing-address.service";
import { HouseOwnerResidingAddressController } from "./ho-residing-address.controller";
import { HouseOwnerResidingAddress } from "../../../database/entities/house-owner-residing-address.entity";
import { LoggerModule } from "../../../logger/logger.module";
@Module({
    imports: [TypeOrmModule.forFeature([HouseOwnerResidingAddress]),LoggerModule],
    controllers: [HouseOwnerResidingAddressController],
    providers:[HouseOwnerResidingAddressService],
    exports: [HouseOwnerResidingAddressService]
})

export class HouseOwnerResidingAddressModule {}
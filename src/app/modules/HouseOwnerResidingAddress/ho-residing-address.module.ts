import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HouseOwnerResidingAddressService} from "../HouseOwnerResidingAddress/ho-residing-address.service";
import { HouseOwnerResidingAddressController } from "./ho-residing-address.controller";
import { HouseOwnerResidingAddress } from "../../../database/entities/house-owner-residing-address.entity";
@Module({
    imports: [TypeOrmModule.forFeature([HouseOwnerResidingAddress])],
    controllers: [HouseOwnerResidingAddressController],
    providers:[HouseOwnerResidingAddressService],
    exports: [HouseOwnerResidingAddressService]
})

export class HouseOwnerResidingAddressModule {}
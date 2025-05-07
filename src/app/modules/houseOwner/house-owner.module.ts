import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HouseOwner } from "../../../database/entities/house-owner.entity";
import { HouseOwnerController } from "./house-owner.controller";
import { HouseOwnerService } from "./house-owner.service";

@Module({
    imports: [TypeOrmModule.forFeature([HouseOwner])],
    controllers: [HouseOwnerController],
    providers:[HouseOwnerService],
    exports: [HouseOwnerService]
})

export class HouseOwnerModule {}
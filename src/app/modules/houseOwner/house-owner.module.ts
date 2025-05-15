import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HouseOwner } from "../../../database/entities/house-owner.entity";
import { HouseOwnerController } from "./house-owner.controller";
import { HouseOwnerService } from "./house-owner.service";
import { UsersModule } from "../users/users.module";
import { User } from "../../../database/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([HouseOwner,User]),UsersModule],
    controllers: [HouseOwnerController],
    providers:[HouseOwnerService],
    exports: [HouseOwnerService]
})

export class HouseOwnerModule {}
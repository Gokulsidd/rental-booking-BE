import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../../database/entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { LoggerModule } from "../../../logger/logger.module";
@Module({
    imports: [TypeOrmModule.forFeature([User]),LoggerModule],
    controllers: [UsersController],
    providers:[UsersService],
    exports: [UsersService]
})

export class UsersModule {}
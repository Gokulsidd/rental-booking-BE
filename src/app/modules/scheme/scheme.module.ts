import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Scheme } from "../../../database/entities/scheme.entity";
import { SchemeController } from "./scheme.controller";
import { SchemeService } from "./scheme.service";
@Module({
    imports: [TypeOrmModule.forFeature([Scheme])],
    controllers: [SchemeController],
    providers:[SchemeService],
    exports: [SchemeService]
})

export class SchemeModule {}
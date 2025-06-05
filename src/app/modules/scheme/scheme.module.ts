import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Scheme } from "../../../database/entities/scheme.entity";
import { SchemeController } from "./scheme.controller";
import { SchemeService } from "./scheme.service";
import { LoggerModule } from "../../../logger/logger.module";
@Module({
    imports: [TypeOrmModule.forFeature([Scheme]),LoggerModule],
    controllers: [SchemeController],
    providers:[SchemeService],
    exports: [SchemeService]
})

export class SchemeModule {}
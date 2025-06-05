import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tenant } from "../../../database/entities/tenant.entity";
import { TenantService } from "./tenant.service";
import { TenantController } from "./tenant.controller";
import { LoggerModule } from "../../../logger/logger.module";
@Module({
    imports: [TypeOrmModule.forFeature([Tenant]),LoggerModule],
    controllers: [TenantController],
    providers:[TenantService],
    exports: [TenantService]
})

export class TenantModule {}
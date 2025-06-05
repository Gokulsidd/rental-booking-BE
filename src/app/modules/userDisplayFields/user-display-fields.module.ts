import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDisplayFields } from '../../../database/entities/user-display-fields.entity'
import { UserDisplayFieldsService } from './user-display-fields.service';
import { UserDisplayFieldsController } from './user-display-fields.controller';
import { LoggerModule } from '../../../logger/logger.module';
import { TenantModule } from '../tenant/tenant.module';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [TypeOrmModule.forFeature([UserDisplayFields]),LoggerModule,TenantModule,UsersModule],
  controllers: [UserDisplayFieldsController],
  providers: [UserDisplayFieldsService],
})
export class UserDisplayFieldsModule {}

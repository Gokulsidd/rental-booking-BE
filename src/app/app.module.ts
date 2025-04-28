import { Module } from '@nestjs/common';
import { CustomConfigModule } from '../config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CustomConfigModule, DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any => {
        const dbConfig = {
          type: 'mysql',
          host: configService.get('db.host'),
          port: configService.get('db.port'),
          username: configService.get('db.username'),
          password: configService.get('db.password'),
          database: configService.get('db.database'),
          entities: [__dirname + '/entities/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          synchronize: configService.get('db.synchronize'),
          logging: configService.get('db.logging'),
          migrationsRun: configService.get('db.migrationsRun'),
        };

        console.log('\n================ DB CONFIG ================\n');
        console.log(dbConfig);
        console.log('\n==========================================\n');

        return dbConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
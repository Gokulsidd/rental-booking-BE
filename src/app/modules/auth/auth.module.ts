import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ConfigKey } from "../../../common/enums/config.enum";
import authConfig from "../../../config/auth.config";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true, load: [authConfig] }), // Only needed once globally
      UsersModule,
      PassportModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const authConfig = configService.get(ConfigKey.AUTH); // 👈 get full object
          return {
            secret: authConfig.jwtSecret,
            signOptions: { expiresIn: authConfig.expiresIn },
          };
        },
      }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
  })
  export class AuthModule {}
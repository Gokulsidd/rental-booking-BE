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
import { EmailVerificationModule } from "../email-verification/email-verification.module";
import { TenantModule } from "../tenant/tenant.module";
import { SchemeModule } from "../scheme/scheme.module";

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
      EmailVerificationModule,
      TenantModule,
      SchemeModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
  })
  export class AuthModule {}
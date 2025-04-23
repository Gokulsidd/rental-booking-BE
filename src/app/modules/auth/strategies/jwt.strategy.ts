// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigKey } from '../../../../common/enums/config.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly configService: ConfigService ) {
    const authConfig = configService.get(ConfigKey.AUTH)
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(authConfig.jwtSecret) || 'YOUR_JWT_SECRET_CODE',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

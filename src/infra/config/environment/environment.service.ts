import { JwtConfigInterface } from '@app/domain/config/jwt/jwt-config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService implements JwtConfigInterface {
  constructor(private readonly config: ConfigService) {}
  getJwtSecret(): string {
    return this.config.get<string>('JWT_SECRET');
  }

  getJwtRefreshToken(): string {
    return this.config.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getExpiresIn(): number {
    return this.config.get<number>('EXPIRES_IN');
  }

  getJwtRefreshTokenExpirationTime(): number {
    return this.config.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }
}

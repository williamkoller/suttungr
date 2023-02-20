import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentModule } from '../config/environment/environment.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { JwtAdapter } from './jwt/jwt-adater';

@Module({
  imports: [EnvironmentModule],
  providers: [BcryptService, JwtAdapter, JwtService],
  exports: [BcryptService, JwtAdapter, JwtService],
})
export class CryptographyModule {}

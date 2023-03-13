import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envFolder, { env } from './domain/config/env/env';
import { UsersModule } from './infra/ioc/users.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { LoggerModule } from './infra/logger/logger.module';
import { EnvironmentModule } from './infra/config/environment/environment.module';
import { CryptographyModule } from './infra/cryptography/cryptography.module';
import { AuthModule } from './infra/ioc/auth.module';
import { RolesModule } from './infra/ioc/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFolder.defaultFolder,
      load: [env],
    }),
    UsersModule,
    ExceptionsModule,
    LoggerModule,
    EnvironmentModule,
    CryptographyModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

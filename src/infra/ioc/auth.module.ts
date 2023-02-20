import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { BcryptInterface } from '@app/domain/criptography/bcrypt.interface';
import { JwtInterface } from '@app/domain/criptography/jwt.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import { AuthController } from '@app/presentation/controllers/auth/auth.controller';
import { JwtStrategy } from '@app/presentation/strategies/jwt.strategy';
import { SignInUseCase } from '@app/usecases/auth/sign-in/sign-in.usecase';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from '../cryptography/bcrypt/bcrypt.service';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { JwtAdapter } from '../cryptography/jwt/jwt-adater';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from '../database/repositories/prisma/users/users.repository';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    DatabaseModule,
    CryptographyModule,
    LoggerModule,
    ExceptionsModule,
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: configService.get<string>('DEFAULT_STRATEGY'),
        property: configService.get<string>('PROPERTY'),
        session: configService.get<string>('SESSION'),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: SignInUseCase,
      useFactory(
        usersRepo: UsersRepositoryInterface,
        bcrypt: BcryptInterface,
        jwt: JwtInterface,
        logger: LoggerInterface,
        exception: ExceptionInterface,
      ) {
        return new SignInUseCase(usersRepo, bcrypt, jwt, logger, exception);
      },
      inject: [
        UsersRepository,
        BcryptService,
        JwtAdapter,
        LoggerService,
        ExceptionsService,
      ],
    },
    {
      provide: JwtStrategy,
      useFactory(
        usersRepo: UsersRepository,
        logger: LoggerService,
        exception: ExceptionsService,
      ) {
        return new JwtStrategy(usersRepo, logger, exception);
      },
      inject: [UsersRepository, LoggerService, ExceptionsService],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}

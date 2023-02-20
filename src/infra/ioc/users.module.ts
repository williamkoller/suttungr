import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { BcryptInterface } from '@app/domain/criptography/bcrypt.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import { UsersController } from '@app/presentation/controllers/users/users.controller';
import { AddUserUseCase } from '@app/usecases/users/add-user/add-user.usecase';
import { DeleteUserUseCase } from '@app/usecases/users/delete-user/delete-user.usecase';
import { FindUserByIdUseCase } from '@app/usecases/users/find-user-by-id/find-user-by-id.usecase';
import { FindUsersUseCase } from '@app/usecases/users/find-users/find-users.usecase';
import { Module } from '@nestjs/common';
import { BcryptService } from '../cryptography/bcrypt/bcrypt.service';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from '../database/repositories/prisma/users/users.repository';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
    DatabaseModule,
    CryptographyModule,
    LoggerModule,
    ExceptionsModule,
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,
    {
      provide: AddUserUseCase,
      useFactory(
        usersRepo: UsersRepositoryInterface,
        bcrypt: BcryptInterface,
        logger: LoggerInterface,
        exception: ExceptionInterface,
      ) {
        return new AddUserUseCase(usersRepo, bcrypt, logger, exception);
      },
      inject: [
        UsersRepository,
        BcryptService,
        LoggerService,
        ExceptionsService,
      ],
    },
    {
      provide: FindUsersUseCase,
      useFactory(
        usersRepo: UsersRepositoryInterface,
        logger: LoggerInterface,
        exception: ExceptionInterface,
      ) {
        return new FindUsersUseCase(usersRepo, logger, exception);
      },
      inject: [UsersRepository, LoggerService, ExceptionsService],
    },
    {
      provide: FindUserByIdUseCase,
      useFactory(
        usersRepo: UsersRepositoryInterface,
        logger: LoggerInterface,
        exception: ExceptionInterface,
      ) {
        return new FindUserByIdUseCase(usersRepo, logger, exception);
      },
      inject: [UsersRepository, LoggerService, ExceptionsService],
    },
    {
      provide: DeleteUserUseCase,
      useFactory(
        usersRepo: UsersRepositoryInterface,
        logger: LoggerInterface,
        exception: ExceptionInterface,
      ) {
        return new DeleteUserUseCase(usersRepo, logger, exception);
      },
      inject: [UsersRepository, LoggerService, ExceptionsService],
    },
  ],
})
export class UsersModule {}

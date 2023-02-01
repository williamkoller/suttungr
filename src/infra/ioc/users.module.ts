import { UsersController } from '@app/presentation/controllers/users/users.controller';
import { AddUserUseCase } from '@app/usecases/users/add-user/add-user.usecase';
import { DeleteUserUseCase } from '@app/usecases/users/delete-user/delete-user.usecase';
import { FindUserByIdUseCase } from '@app/usecases/users/find-user-by-id/find-user-by-id.usecase';
import { FindUsersUseCase } from '@app/usecases/users/find-users/find-users.usecase';
import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
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
    AddUserUseCase,
    FindUsersUseCase,
    FindUserByIdUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}

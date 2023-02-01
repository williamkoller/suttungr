import { UsersController } from '@app/presentation/controllers/users/users.controller';
import { AddUserUseCase } from '@app/usecases/users/add-user/add-user.usecase';
import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule, DatabaseModule, CryptographyModule],
  controllers: [UsersController],
  providers: [PrismaService, AddUserUseCase],
})
export class UsersModule {}

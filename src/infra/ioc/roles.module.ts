import { RoleRepositoryInterface } from '@app/data/protocols/database/role/role.repository.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import { RolesController } from '@app/presentation/controllers/roles/roles.controller';
import { AddRoleUseCase } from '@app/usecases/roles/add-role/add-role.usecase';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RolesRepository } from '../database/repositories/prisma/roles/roles.repository';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, DatabaseModule, LoggerModule, ExceptionsModule],
  providers: [
    {
      provide: AddRoleUseCase,
      useFactory(
        rolesRepo: RoleRepositoryInterface,
        logger: LoggerInterface,
        exception: ExceptionInterface,
      ) {
        return new AddRoleUseCase(rolesRepo, logger, exception);
      },
      inject: [RolesRepository, LoggerService, ExceptionsService],
    },
  ],
  controllers: [RolesController],
})
export class RolesModule {}

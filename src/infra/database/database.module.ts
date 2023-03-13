import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesRepository } from './repositories/prisma/roles/roles.repository';
import { UsersRepository } from './repositories/prisma/users/users.repository';

@Module({
  imports: [PrismaModule],
  providers: [UsersRepository, RolesRepository],
  exports: [UsersRepository, RolesRepository],
})
export class DatabaseModule {}

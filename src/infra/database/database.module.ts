import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from './repositories/prisma/users/users.repository';

@Module({
  imports: [PrismaModule],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class DatabaseModule {}

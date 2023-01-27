import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repositories/user/user.repository';

@Module({
  imports: [PrismaService],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}

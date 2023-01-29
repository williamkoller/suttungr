import { UserController } from '@app/presentation/controllers/user/user.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule, DatabaseModule],
  controllers: [UserController],
  providers: [PrismaService],
})
export class UserModule {}

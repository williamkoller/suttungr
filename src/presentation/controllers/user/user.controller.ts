import { UserRepository } from '@app/infra/database/repositories/user/user.repository';
import { CreateUserDTO } from '@app/presentation/dtos/user/create-user.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Controller('users')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(private readonly userRepo: UserRepository) {}

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<User> {
    try {
      return await this.userRepo.create(data);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          this.logger.log(
            'There is a unique constraint violation, a new user cannot be created with this email',
          );
        }
      }
    }
    throw new BadRequestException(
      'There is a unique constraint violation, a new user cannot be created with this email',
    );
  }
}

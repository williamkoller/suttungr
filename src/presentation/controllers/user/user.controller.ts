import { UserRepository } from '@app/infra/database/repositories/user/user.repository';
import { CreateUserDTO } from '@app/presentation/dtos/user/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userRepo: UserRepository) {}

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return await this.userRepo.create(data);
  }
}

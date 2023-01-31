import { CreateUserDTO } from '@app/presentation/dtos/user/create-user.dto';
import { AddUserUseCase } from '@app/usecases/users/add-user/add-user.usecase';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly addUserUseCase: AddUserUseCase) {}

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return await this.addUserUseCase.execute(data);
  }
}

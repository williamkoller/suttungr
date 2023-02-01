import { CreateUserDTO } from '@app/presentation/dtos/user/create-user.dto';
import { AddUserUseCase } from '@app/usecases/users/add-user/add-user.usecase';
import { FindUsersUseCase } from '@app/usecases/users/find-users/find-users.usecase';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private readonly addUserUseCase: AddUserUseCase,
    private readonly findUsersUseCase: FindUsersUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return await this.addUserUseCase.execute(data);
  }

  @Get()
  async find(): Promise<User[]> {
    return await this.findUsersUseCase.execute();
  }
}

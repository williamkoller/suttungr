import { CreateUserDTO } from '@app/presentation/dtos/user/create-user.dto';
import { ResponseUserType } from '@app/presentation/mappers/users/users.mapper';
import { AddUserUseCase } from '@app/usecases/users/add-user/add-user.usecase';
import { DeleteUserUseCase } from '@app/usecases/users/delete-user/delete-user.usecase';
import { FindUserByIdUseCase } from '@app/usecases/users/find-user-by-id/find-user-by-id.usecase';
import { FindUsersUseCase } from '@app/usecases/users/find-users/find-users.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private readonly addUserUseCase: AddUserUseCase,
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return await this.addUserUseCase.execute(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async find(): Promise<ResponseUserType[]> {
    return await this.findUsersUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseUserType> {
    return await this.findUserByIdUseCase.execute(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}

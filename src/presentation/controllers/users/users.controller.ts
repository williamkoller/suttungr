import { CreateUserOutputDTO } from '@app/presentation/dtos/user/create-user-output.dto';
import { CreateUserDTO } from '@app/presentation/dtos/user/create-user.dto';
import { UpdateUserDTO } from '@app/presentation/dtos/user/update-user.dto';
import { JwtAuthGuard } from '@app/presentation/guards/jwt-auth.guard';
import { ResponseUserType } from '@app/presentation/mappers/users/users.mapper';
import { AddUserUseCase } from '@app/usecases/users/add-user/add-user.usecase';
import { DeleteUserUseCase } from '@app/usecases/users/delete-user/delete-user.usecase';
import { FindUserByIdUseCase } from '@app/usecases/users/find-user-by-id/find-user-by-id.usecase';
import { FindUsersUseCase } from '@app/usecases/users/find-users/find-users.usecase';
import { UpdateUserUseCase } from '@app/usecases/users/update-user/update-user.usecase';
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
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly addUserUseCase: AddUserUseCase,
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user.',
  })
  @ApiCreatedResponse({
    type: CreateUserOutputDTO,
  })
  @ApiBadRequestResponse({
    description: 'This is the type of error, when the request data is empty.',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          timestamp: '2023-02-20T15:07:18.182Z',
          path: '/users',
          message: [
            'name should not be empty',
            'surname should not be empty',
            'email should not be empty',
            'Password too weak',
            'password must be longer than or equal to 8 characters',
            'password should not be empty',
          ],
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiConflictResponse({
    description: 'There is a user with that email.',
    content: {
      'application/json': {
        example: {
          statusCode: 409,
          timestamp: '2023-02-20T15:03:39.713Z',
          path: '/users',
          message: 'There is a user with that email: william@mail@gmail.com',
        },
      },
    },
  })
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return await this.addUserUseCase.execute(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find all users.',
  })
  @ApiOkResponse({
    description: 'Find all users.',
    content: {
      'application/json': {
        example: [
          {
            id: 4,
            name: 'Pietro',
            surname: 'Koller',
            active: true,
            email: 'pietrokoller@gmail.com',
            password:
              '$2b$10$YhJUdhI5knhqZVL7tIWd4OWwUKpCuySkO6lEmuQvLQvZ/XG3rwWd2',
            createdAt: '2023-02-01T15:00:47.117Z',
            updatedAt: '2023-02-01T15:00:47.117Z',
          },
          {
            id: 9,
            name: 'Marli',
            surname: 'Koller',
            active: true,
            email: 'marlikoller@gmail.com',
            password:
              '$2b$10$Ya0EWRFfmmEYDyFzwjhbSu.FJgz6gZ1BygXum0WiGZ6wXEAe.pB9q',
            createdAt: '2023-02-17T18:01:11.819Z',
            updatedAt: '2023-02-17T18:01:11.819Z',
          },
        ],
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No record found.',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          timestamp: '2023-02-20T15:18:51.944Z',
          path: '/users',
          message: 'No record found.',
        },
      },
    },
  })
  async find(): Promise<ResponseUserType[]> {
    return await this.findUsersUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find user by id.',
  })
  @ApiOkResponse({
    description: 'Find user by id.',
    content: {
      'application/json': {
        example: {
          id: 4,
          name: 'Pietro',
          surname: 'Koller',
          active: true,
          email: 'pietrokoller@gmail.com',
          password:
            '$2b$10$YhJUdhI5knhqZVL7tIWd4OWwUKpCuySkO6lEmuQvLQvZ/XG3rwWd2',
          createdAt: '2023-02-01T15:00:47.117Z',
          updatedAt: '2023-02-01T15:00:47.117Z',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'This is the type of error, when the request data is empty.',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          timestamp: '2023-02-20T15:26:27.828Z',
          path: '/users/%224%22',
          message: 'Validation failed (numeric string is expected)',
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found this id.',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          timestamp: '2023-02-20T15:18:51.944Z',
          path: '/users',
          message: 'User not found this id.',
        },
      },
    },
  })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseUserType> {
    return await this.findUserByIdUseCase.execute(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user by id.',
  })
  @ApiNoContentResponse({
    description: 'Delete user by id',
  })
  @ApiBadRequestResponse({
    description: 'This is the type of error, when the request data is empty.',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          timestamp: '2023-02-20T15:26:27.828Z',
          path: '/users/%224%22',
          message: 'Validation failed (numeric string is expected)',
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found this id.',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          timestamp: '2023-02-20T15:18:51.944Z',
          path: '/users',
          message: 'User not found this id.',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized user.',
    content: {
      'application/json': {
        example: {
          statusCode: 401,
          timestamp: '2023-02-20T21:51:41.389Z',
          path: '/users/15',
          message: 'Unauthorized',
        },
      },
    },
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDTO,
  ) {
    return await this.updateUserUseCase.execute(id, data);
  }
}

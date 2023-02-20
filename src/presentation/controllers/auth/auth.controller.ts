import { AuthInputDTO } from '@app/presentation/dtos/auth/auth-input.dto';
import { AuthOutputDTO } from '@app/presentation/dtos/auth/auth-output.dto';
import { SignInUseCase } from '@app/usecases/auth/sign-in/sign-in.usecase';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Sign in',
  })
  @ApiOkResponse({
    type: AuthOutputDTO,
  })
  @ApiBadRequestResponse({
    description: 'This is the type of error, when the request data is empty.',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          timestamp: '2023-02-20T21:41:07.287Z',
          path: '/auth/sign-in',
          message: [
            'email should not be empty',
            'email must be an email',
            'password should not be empty',
          ],
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          timestamp: '2023-02-20T21:48:35.294Z',
          path: '/auth/sign-in',
          message: 'User not found',
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
          timestamp: '2023-02-20T21:49:50.391Z',
          path: '/auth/sign-in',
          message: 'Email or password incorrect',
        },
      },
    },
  })
  async signIn(@Body() data: AuthInputDTO) {
    return await this.signInUseCase.execute(data);
  }
}

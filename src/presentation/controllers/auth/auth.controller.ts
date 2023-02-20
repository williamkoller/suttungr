import { AuthInputDTO } from '@app/presentation/dtos/auth/auth-input.dto';
import { SignInUseCase } from '@app/usecases/auth/sign-in/sign-in.usecase';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('sign-in')
  async signIn(@Body() data: AuthInputDTO) {
    return await this.signInUseCase.execute(data);
  }
}

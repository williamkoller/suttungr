import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { BcryptInterface } from '@app/domain/criptography/bcrypt.interface';
import { JwtInterface } from '@app/domain/criptography/jwt.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import { AuthInputDTO } from '@app/presentation/dtos/auth/auth-input.dto';

export class SignInUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryInterface,
    private readonly bcrypt: BcryptInterface,
    private readonly jwt: JwtInterface,
    private readonly logger: LoggerInterface,
    private readonly exception: ExceptionInterface,
  ) {}

  public async execute(data: AuthInputDTO) {
    const user = await this.usersRepo.findByEmail(data.email);

    if (!user) {
      this.logger.warn('SignInUseCase', 'User not found');
      this.exception.notFoundException({
        message: 'User not found',
      });
    }

    const userHasValid = await this.bcrypt.compare(
      data.password,
      user.password,
    );

    if (!userHasValid) {
      this.logger.warn('SignInUseCase', 'Email or password incorrect');
      this.exception.unauthorizedException({
        message: 'Email or password incorrect',
      });
    }

    const accessToken = await this.jwt.encrypt(user);

    this.logger.log(`SignInUseCase`, `${JSON.stringify(accessToken)}`);

    return {
      accessToken,
    };
  }
}

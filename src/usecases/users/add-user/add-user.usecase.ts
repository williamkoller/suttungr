import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { BcryptInterface } from '@app/domain/criptography/bcrypt.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import { CreateUserDTO } from '@app/presentation/dtos/user/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AddUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryInterface,
    private readonly bcrypt: BcryptInterface,
    private readonly logger: LoggerInterface,
    private readonly exception: ExceptionInterface,
  ) {}
  async execute(data: CreateUserDTO): Promise<User> {
    const verifyUserExists = await this.usersRepo.findByEmail(
      data.email.toLowerCase(),
    );

    if (verifyUserExists) {
      this.exception.conflictException({
        message: `There is a user with that email: ${verifyUserExists.email}`,
      });
    }

    const newUser = {
      ...data,
      email: data.email.toLowerCase(),
      password: await this.bcrypt.hash(data.password),
    };

    this.logger.log(`AddUserUseCase`, `newUser: ${JSON.stringify(newUser)}`);

    return await this.usersRepo.insert(newUser as User);
  }
}

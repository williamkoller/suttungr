import { BcryptService } from '@app/infra/cryptography/bcrypt/bcrypt.service';
import { UsersRepository } from '@app/infra/database/repositories/users/users.repository';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { LoggerService } from '@app/infra/logger/logger.service';
import { CreateUserDTO } from '@app/presentation/dtos/user/create-user.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AddUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly bcryptService: BcryptService,
    private readonly loggerService: LoggerService,
    private readonly exceptionsService: ExceptionsService,
  ) {}
  async execute(data: CreateUserDTO): Promise<User> {
    const verifyUserExists = await this.usersRepo.findByEmail(data.email);

    if (verifyUserExists) {
      this.exceptionsService.conflictException({
        message: `There is a user with that email: ${verifyUserExists.email}`,
        codeError: HttpStatus.CONFLICT,
      });
    }

    const newUser = {
      ...data,
      password: await this.bcryptService.hash(data.password),
    };

    this.loggerService.log(
      `AddUserUseCase`,
      `newUser: ${JSON.stringify(newUser)}`,
    );

    return await this.usersRepo.insert(newUser);
  }
}

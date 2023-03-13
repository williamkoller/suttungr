import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryInterface,
    private readonly logger: LoggerInterface,
    private readonly exception: ExceptionInterface,
  ) {}

  async execute(id: number): Promise<User> {
    const verifyUserExists = await this.usersRepo.findById(id);

    if (!verifyUserExists) {
      this.exception.notFoundException({
        message: `User not found this id: ${id}`,
      });
    }

    this.logger.log(
      `FindUserByIdUseCase`,
      `verifyUserExists: ${JSON.stringify(verifyUserExists)}`,
    );

    return verifyUserExists;
  }
}

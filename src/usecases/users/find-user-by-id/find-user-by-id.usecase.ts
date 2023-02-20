import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import {
  ResponseUserType,
  UsersMapper,
} from '@app/presentation/mappers/users/users.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryInterface,
    private readonly logger: LoggerInterface,
    private readonly exception: ExceptionInterface,
  ) {}

  async execute(id: number): Promise<ResponseUserType> {
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

    return UsersMapper.toUser(verifyUserExists);
  }
}

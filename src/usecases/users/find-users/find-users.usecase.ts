import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import {
  ResponseUserType,
  UsersMapper,
} from '@app/presentation/mappers/users/users.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUsersUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryInterface,
    private readonly logger: LoggerInterface,
    private readonly exception: ExceptionInterface,
  ) {}

  async execute(): Promise<ResponseUserType[]> {
    const users = await this.usersRepo.find();

    if (!users.length) {
      this.exception.notFoundException({
        message: 'No record found',
      });
    }

    this.logger.log(`FindUsersUseCase`, `users: ${JSON.stringify(users)}`);

    return UsersMapper.toUsers(users);
  }
}

import { UsersRepository } from '@app/infra/database/repositories/prisma/users/users.repository';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { LoggerService } from '@app/infra/logger/logger.service';
import {
  ResponseUserType,
  UsersMapper,
} from '@app/presentation/mappers/users/users.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUsersUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly loggerService: LoggerService,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(): Promise<ResponseUserType[]> {
    const users = await this.usersRepo.find();

    if (!users.length) {
      this.exceptionsService.notFoundException({
        message: 'No record found',
      });
    }

    this.loggerService.log(
      `FindUsersUseCase`,
      `users: ${JSON.stringify(users)}`,
    );

    return UsersMapper.toUsers(users);
  }
}

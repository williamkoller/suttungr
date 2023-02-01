import { UsersRepository } from '@app/infra/database/repositories/users/users.repository';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { LoggerService } from '@app/infra/logger/logger.service';
import {
  ResponseUserType,
  UsersMapper,
} from '@app/presentation/mappers/users/users.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly loggerService: LoggerService,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(id: number): Promise<ResponseUserType> {
    const verifyUserExists = await this.usersRepo.findById(id);

    if (!verifyUserExists) {
      this.exceptionsService.notFoundException({
        message: `User not found this id: ${id}`,
      });
    }

    this.loggerService.log(
      `FindUserByIdUseCase`,
      `verifyUserExists: ${JSON.stringify(verifyUserExists)}`,
    );

    return UsersMapper.toUser(verifyUserExists);
  }
}

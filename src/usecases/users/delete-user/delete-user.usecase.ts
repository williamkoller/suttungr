import { UsersRepository } from '@app/infra/database/repositories/prisma/users/users.repository';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { LoggerService } from '@app/infra/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly loggerService: LoggerService,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(id: number): Promise<void> {
    const verifyUserExists = await this.usersRepo.findById(id);

    if (!verifyUserExists) {
      this.exceptionsService.notFoundException({
        message: `User not found this id: ${id}`,
      });
    }

    this.loggerService.log(
      `DeleteUserUseCase`,
      `deleted user by id: ${JSON.stringify(
        verifyUserExists.id,
      )} with successfully: `,
    );

    await this.usersRepo.delete(id);
  }
}

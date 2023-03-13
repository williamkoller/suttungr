import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryInterface,
    private readonly logger: LoggerInterface,
    private readonly exception: ExceptionInterface,
  ) {}

  async execute(id: number): Promise<void> {
    const verifyUserExists = await this.usersRepo.findById(id);

    if (!verifyUserExists) {
      this.exception.notFoundException({
        message: `User not found this id: ${id}`,
      });
    }

    const userActive = await this.usersRepo.findUserActive(verifyUserExists.id);

    if (!userActive) {
      this.logger.warn('DeleteUserUseCase', 'User deactivate');
      this.exception.badRequestException({
        message: 'User deactivate',
      });
    }

    this.logger.log(
      `DeleteUserUseCase`,
      `deleted user by id: ${JSON.stringify(
        verifyUserExists.id,
      )} with successfully: `,
    );

    await this.usersRepo.delete(id);
  }
}

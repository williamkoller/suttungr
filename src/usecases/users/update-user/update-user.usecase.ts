import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { BcryptInterface } from '@app/domain/criptography/bcrypt.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import { UpdateUserDTO } from '@app/presentation/dtos/user/update-user.dto';
import { UsersMapper } from '@app/presentation/mappers/users/users.mapper';
import { User } from '@prisma/client';

export class UpdateUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryInterface,
    private readonly bcrypt: BcryptInterface,
    private readonly logger: LoggerInterface,
    private readonly exception: ExceptionInterface,
  ) {}

  async execute(id: number, data: UpdateUserDTO) {
    const userFound = await this.usersRepo.findById(id);

    if (!userFound) {
      this.logger.warn('UpdateUserUseCase', 'User not found');
      this.exception.notFoundException({
        message: 'User not found.',
      });
    }

    const dataUpdated = {
      ...data,
      email: data?.email?.toLowerCase(),
      password: await this.bcrypt.hash(data?.password),
    };

    const userUpdate = await this.usersRepo.update(
      userFound.id,
      dataUpdated as User,
    );

    return UsersMapper.toUser(userUpdate);
  }
}

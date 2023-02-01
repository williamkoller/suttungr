import { BcryptService } from '@app/infra/cryptography/bcrypt/bcrypt.service';
import { UsersRepository } from '@app/infra/database/repositories/users/users.repository';
import { CreateUserDTO } from '@app/presentation/dtos/user/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AddUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly bcryptService: BcryptService,
  ) {}
  async execute(data: CreateUserDTO): Promise<User> {
    const verifyUserExists = await this.usersRepo.findByEmail(data.email);

    if (verifyUserExists) {
      throw new ConflictException(
        `There is a user with that email: ${verifyUserExists.email}`,
      );
    }

    const newUser = {
      ...data,
      password: await this.bcryptService.hash(data.password),
    };

    return await this.usersRepo.insert(newUser);
  }
}

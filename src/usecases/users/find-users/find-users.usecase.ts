import { UsersRepository } from '@app/infra/database/repositories/users/users.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class FindUsersUseCase {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(): Promise<User[]> {
    return await this.usersRepo.find();
  }
}

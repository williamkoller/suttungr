import { BaseRepositoryInterface } from '@app/data/protocols/database/base/base.repository.interface';
import { User } from '@prisma/client';

export class UsersDbInMemoryRepositorty
  implements BaseRepositoryInterface<User>
{
  users: User[] = [];

  async insert(data: User): Promise<User> {
    this.users.push(data);
    return this.users.find((user) => user.id === data.id);
  }

  async find(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async update(id: number, data: User): Promise<User> {
    this.users = this.users.filter((user) => user.id !== id);
    this.users.push(data);
    return this.users.find((user) => user.id === id);
  }

  async delete(id: number): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

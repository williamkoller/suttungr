import { Prisma, User } from '@prisma/client';
import { BaseRepositoryInterface } from '@app/data/protocols/database/base/base.repository.interface';
import { PrismaService as DbInstance } from '@app/infra/prisma/prisma.service';

export class UserRepository implements BaseRepositoryInterface<User> {
  constructor(private readonly db: DbInstance) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.db.user.create({ data });
  }

  async find(): Promise<User[]> {
    return await this.db.user.findMany();
  }

  async findById(id: number): Promise<User> {
    return await this.db.user.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.db.user.findFirst({ where: { email } });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.db.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.db.user.delete({ where: { id } });
  }
}

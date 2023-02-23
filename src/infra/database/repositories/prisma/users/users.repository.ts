import { Prisma, User } from '@prisma/client';
import { PrismaService as DbInstance } from '@app/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(private readonly db: DbInstance) {}

  async insert(data: Prisma.UserCreateInput): Promise<User> {
    return await this.db.user.create({ data });
  }

  async find(): Promise<User[]> {
    return await this.db.user.findMany();
  }

  async findById(id: number): Promise<User> {
    return await this.db.user.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.db.user.findUnique({ where: { email } });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.db.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.db.user.delete({ where: { id } });
  }
}

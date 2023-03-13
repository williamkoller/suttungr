import { UsersRepositoryInterface } from '@app/data/protocols/database/user/user.repository.interface';
import { PrismaService as DbInstance } from '@app/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  private userActive = true;
  private userDeactivate = false;
  constructor(private readonly db: DbInstance) {}

  async insert(data: User): Promise<User> {
    return await this.db.user.create({ data });
  }

  async find(): Promise<User[]> {
    return await this.db.user.findMany({
      include: {
        roles: true,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.db.user.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.db.user.findUnique({ where: { email } });
  }

  async update(id: number, data: User): Promise<User> {
    return await this.db.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.db.user.delete({
      where: { id },
    });
  }

  async deactivateAUser(id: number): Promise<void> {
    await this.db.user.update({
      where: { id },
      data: {
        active: this.userDeactivate,
      },
    });
  }

  async findUserActive(id: number): Promise<User> {
    return await this.db.user.findFirst({
      where: { id, AND: { active: this.userActive } },
    });
  }
}

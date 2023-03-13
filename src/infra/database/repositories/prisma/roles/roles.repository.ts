import { RoleRepositoryInterface } from '@app/data/protocols/database/role/role.repository.interface';
import { PrismaService as DbInstance } from '@app/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class RolesRepository implements RoleRepositoryInterface {
  constructor(private readonly db: DbInstance) {}

  async insert(data: Role): Promise<Role> {
    return await this.db.role.create({
      data,
    });
  }

  async find(): Promise<Role[]> {
    return await this.db.role.findMany();
  }

  async findById(id: number): Promise<Role> {
    return await this.db.role.findFirst({ where: { id } });
  }

  async findByName(name: string): Promise<Role> {
    return await this.db.role.findUnique({ where: { name } });
  }

  async update(id: number, data: Role): Promise<Role> {
    return await this.db.role.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.db.role.delete({
      where: { id },
    });
  }
}

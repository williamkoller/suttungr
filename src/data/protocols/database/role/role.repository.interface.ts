import { Role } from '@prisma/client';
import { BaseRepositoryInterface } from '../base/base.repository.interface';

export interface RoleRepositoryInterface extends BaseRepositoryInterface<Role> {
  findByName(name: string): Promise<Role>;
}

import { User } from '@prisma/client';
import { BaseRepositoryInterface } from '../base/base.repository.interface';

export interface UsersRepositoryInterface
  extends BaseRepositoryInterface<User> {
  findByEmail: (email: string) => Promise<User>;
}

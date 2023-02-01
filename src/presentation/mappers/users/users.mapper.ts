import { User } from '@prisma/client';

export class UsersMapper {
  static toUser(user: User): ResponseUserType {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      active: user.active,
      email: user.email,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  static toUsers(users: User[]): ResponseUserType[] {
    return users.map(this.toUser);
  }
}

export type ResponseUserType = {
  id: number;
  name: string;
  surname: string;
  active: boolean;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserModel {
  readonly id: number;
  readonly name: string;
  readonly surname: string;
  readonly active: boolean;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

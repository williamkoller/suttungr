export class UserModel {
  readonly id: number;
  readonly name: string;
  readonly surname: string;
  readonly active: boolean;
  readonly email: string;
  readonly password: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}

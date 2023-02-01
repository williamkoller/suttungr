import { UserModel } from '../models/user/user.model';

export interface JwtInterface {
  encrypt: (userModel: UserModel) => Promise<string>;
  decrypt: (token: string) => Promise<unknown>;
}

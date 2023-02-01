import { BcryptInterface } from '@app/domain/criptography/bcrypt.interface';
import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptService implements BcryptInterface {
  async hash(plaintext: string): Promise<string> {
    return hashSync(plaintext, genSaltSync());
  }
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return compareSync(plaintext, digest);
  }
}

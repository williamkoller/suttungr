import { JwtInterface } from '@app/domain/criptography/jwt.interface';
import { UserModel } from '@app/domain/models/user/user.model';
import { EnvironmentService } from '@app/infra/config/environment/environment.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VerifyType } from '../types/verify.type';

@Injectable()
export class JwtAdapter implements JwtInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environment: EnvironmentService,
  ) {}

  encrypt(userModel: UserModel): Promise<string> {
    const jwtPayload = {
      id: userModel.id,
      name: userModel.name,
      surname: userModel.surname,
      createdAt: userModel.created_at,
      updatedAt: userModel.updated_at,
      dateTime: new Date(),
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: this.environment.getJwtSecret(),
      expiresIn: this.environment.getExpiresIn(),
    });
  }

  decrypt(token: string): Promise<VerifyType> {
    return this.jwtService.verifyAsync(token, {
      secret: this.environment.getJwtSecret(),
    });
  }
}

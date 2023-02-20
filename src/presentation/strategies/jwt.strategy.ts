import { UsersRepository } from '@app/infra/database/repositories/prisma/users/users.repository';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { LoggerService } from '@app/infra/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly logger: LoggerService,
    private readonly exception: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(user: User): Promise<User> {
    this.logger.log(`JwtStrategy`, `${JSON.stringify(user)}`);

    const userFound = await this.usersRepo.findById(user.id);

    if (!userFound) {
      this.logger.warn('JwtStrategy', 'User not found.');
      this.exception.notFoundException({
        message: 'User not found.',
      });
    }

    const validUser = async () => {
      userFound.id === user.id;
    };

    if (!userFound && validUser()) {
      this.logger.warn('JwtStrategy', 'UnauthorizedException User');
      this.exception.unauthorizedException();
    }

    this.logger.log(`JwtStrategy`, `${JSON.stringify(userFound)}`);

    return userFound;
  }
}

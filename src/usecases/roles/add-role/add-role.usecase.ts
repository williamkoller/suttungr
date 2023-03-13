import { RoleRepositoryInterface } from '@app/data/protocols/database/role/role.repository.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { LoggerInterface } from '@app/domain/logger/logger.interface';
import { CreateRoleDTO } from '@app/presentation/dtos/role/create-role.dto';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class AddRoleUseCase {
  constructor(
    private readonly rolesRepo: RoleRepositoryInterface,
    private readonly logger: LoggerInterface,
    private readonly exception: ExceptionInterface,
  ) {}

  async execute(data: CreateRoleDTO) {
    const role = await this.rolesRepo.findByName(data.name);

    if (role) {
      this.logger.log(
        'AddRoleUseCase',
        `There is a user with that name: ${data.name}`,
      );
      this.exception.conflictException({
        message: `There is a user with that name: ${data.name}`,
      });
    }

    return await this.rolesRepo.insert(data as Role);
  }
}

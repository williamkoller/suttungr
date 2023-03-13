import { CreateRoleDTO } from '@app/presentation/dtos/role/create-role.dto';
import { AddRoleUseCase } from '@app/usecases/roles/add-role/add-role.usecase';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly addRoleUseCase: AddRoleUseCase) {}

  @Post()
  async create(@Body() data: CreateRoleDTO) {
    return await this.addRoleUseCase.execute(data);
  }
}

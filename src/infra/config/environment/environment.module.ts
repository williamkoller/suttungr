import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';

@Module({
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}

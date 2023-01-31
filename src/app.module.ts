import { Module } from '@nestjs/common';
import { UsersModule } from './infra/ioc/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infra/common/filters/all-exception.filter';
import { swagger } from './infra/docs/swagger/swagger';
import { LoggerService } from './infra/logger/logger.service';
import { PrismaService } from './infra/prisma/prisma.service';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  swagger(app);

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');
  const appUrl = config.get<string>('APP_URL');

  await app.listen(port, () => logger.log(`Server running in: ${appUrl}`));
}
bootstrap();

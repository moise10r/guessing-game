import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const configService = app.get(ConfigService);
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { GuessManagerModule } from './guess-manager.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GuessManagerModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const configService = app.get(ConfigService);
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();

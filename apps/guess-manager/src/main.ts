import { NestFactory } from '@nestjs/core';
import { GuessManagerModule } from './guess-manager.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GuessManagerModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();

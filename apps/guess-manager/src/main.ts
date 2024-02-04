import { NestFactory } from '@nestjs/core';
import { GuessManagerModule } from './guess-manager.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(GuessManagerModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('GUESS_MANAGER'));
  await app.startAllMicroservices();
}
bootstrap();

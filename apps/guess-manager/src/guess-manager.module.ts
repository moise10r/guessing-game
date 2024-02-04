import { Module } from '@nestjs/common';
import { GuessManagerController } from './guess-manager.controller';
import { GuessManagerService } from './guess-manager.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule, RmqModule } from '@app/common';
import { USERS_SERVICE } from '@app/common/constants';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_GUESS_MANAGER_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/guess-manager/.env',
    }),
    RmqModule.register({
      name: USERS_SERVICE,
    }),
  ],
  controllers: [GuessManagerController],
  providers: [GuessManagerService],
})
export class GuessManagerModule {}

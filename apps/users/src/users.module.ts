import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PlayersModule } from './players/players.module';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GameRoundModule } from './game-round/game-round.module';
import * as Joi from 'joi';
import { GUESS_MANAGER_SERVICE } from '@app/common/constants';

@Module({
  imports: [
    PlayersModule,
    GameRoundModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_USERS_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/users/.env',
    }),
    RmqModule.register({
      name: GUESS_MANAGER_SERVICE,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

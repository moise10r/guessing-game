import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { DatabaseModule, LoggerModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { PlayersController } from './players.controller';
import * as Joi from 'joi';
import { PlayerRepository } from './repositories/player.repository';
import { PlayerDocument, PlayerSchema } from './models/player.schema';
import { JoinedPlayersService } from '../../../../libs/common/src/joined-player/joined-player.service';
import { GameRoundModule } from '../game-round/game-round.module';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: PlayerDocument.name, schema: PlayerSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    LoggerModule,
    RmqModule,
    GameRoundModule,
  ],
  providers: [PlayersService, PlayerRepository, JoinedPlayersService],
  controllers: [PlayersController],
  exports: [PlayersService, PlayerRepository],
})
export class PlayersModule {}

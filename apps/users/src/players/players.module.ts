import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { PlayersController } from './players.controller';
import * as Joi from 'joi';
import { PlayerRepository } from './repositories/player.repository';
import { PlayerDocument, PlayerSchema } from './models/player.schema';

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
  ],
  providers: [PlayersService, PlayerRepository],
  controllers: [PlayersController],
  exports: [PlayersService],
})
export class PlayersModule {}

import { Module } from '@nestjs/common';
import { GameRoundService } from './game-round.service';
import { GameRoundRepository } from './repositories/game-round.repository';
import { DatabaseModule } from '@app/common';
import { GameRoundDocument, GameRoundSchema } from './models/game-round.shema';
import { JoinedPlayersService } from '../../../../libs/common/src/joined-player/joined-player.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: GameRoundDocument.name, schema: GameRoundSchema },
    ]),
  ],
  providers: [GameRoundService, GameRoundRepository, JoinedPlayersService],
  exports: [GameRoundService],
})
export class GameRoundModule {}

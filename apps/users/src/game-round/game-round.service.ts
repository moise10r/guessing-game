import { Injectable } from '@nestjs/common';
import { GameRoundRepository } from './repositories/game-round.repository';
import { joinedPlayersMap } from '../../../../libs/common/src/joined-player/joined-player.service';
import { IGameRound } from './interfaces/game-round.interface';

@Injectable()
export class GameRoundService {
  constructor(private readonly gameRoundRepository: GameRoundRepository) {}

  async createGameRound(gameRoundPayload: IGameRound): Promise<IGameRound> {
    const players = Array.from(joinedPlayersMap.values());
    console.log('players', players, gameRoundPayload);
    joinedPlayersMap.clear();
    const freezePoint = gameRoundPayload.freezePoint;

    // send the event now to the gues
    const createdGameRound = await this.gameRoundRepository.create({
      players: Object.values(players),
      freezePoint,
    });
    return createdGameRound;
  }
}

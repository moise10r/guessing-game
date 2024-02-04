import { Injectable } from '@nestjs/common';
import { GameSessionRepository } from './repositories/game-session.repository';
import { JoinedPlayersService } from '../joined-player/joined-player.service';

@Injectable()
export class GameSessionService {
  constructor(
    private readonly gameSessionRepository: GameSessionRepository,
    private readonly joinedPlayersService: JoinedPlayersService,
  ) {}

  async createSession(freezePoint: number): Promise<string> {
    const players = this.joinedPlayersService.getJoinedPlayers();
    console.log('players', players);

    await this.gameSessionRepository.create({
      players: Object.values(players),
      freezePoint,
    });
    return 'Game session created';
  }
}

import { Injectable } from '@nestjs/common';
import { GameSessionRepository } from './repositories/game-session.repository';
import { JoinedPlayersService } from '../joined-player/joined-player.service';

@Injectable()
export class GameSessionService {
  constructor(
    private readonly gameSessionRepository: GameSessionRepository,
    private readonly joinedPlayersService: JoinedPlayersService,
  ) {}

  async createSession(): Promise<string> {
    const players = this.joinedPlayersService.getJoinedPlayers();
    await this.gameSessionRepository.create({
      players: Object.values(players),
    });
    return 'Game session created';
  }
}

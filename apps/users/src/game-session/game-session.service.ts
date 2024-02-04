import { Injectable } from '@nestjs/common';
import { GameSessionRepository } from './repositories/game-session.repository';
import { JoinedPlayersService } from '../joined-player/joined-player.service';
import { IGameSession } from './interfaces/game-session.interface';
import { CreateGameSessionDto } from '@app/common/dto/create-game-session.dto';

@Injectable()
export class GameSessionService {
  constructor(
    private readonly gameSessionRepository: GameSessionRepository,
    private readonly joinedPlayersService: JoinedPlayersService,
  ) {}

  async createGameSession(
    gameSessionPayload: CreateGameSessionDto,
  ): Promise<IGameSession> {
    const players = this.joinedPlayersService.getJoinedPlayers();
    console.log('players', players, gameSessionPayload);
    const freezePoint = gameSessionPayload.freezePoint;
    const createdGameSession = await this.gameSessionRepository.create({
      players: Object.values(players),
      freezePoint,
    });
    return createdGameSession;
  }
}

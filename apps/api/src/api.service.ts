import { USERS_SERVICE } from '@app/common/constants';
import { CREATE_PLAYER, START_GAME } from '@app/common/constants/messages';
import { CreateGameSessionDto } from '@app/common/dto/create-game-session.dto';
import { PlayerDto } from '@app/common/dto/player.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { tap } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
  ) {}

  async createPlayer(playerPayload: PlayerDto) {
    return this.usersClient
      .send(CREATE_PLAYER, playerPayload)
      .pipe(tap((res) => res));
  }

  async startGameSession(gameSessionPayload: CreateGameSessionDto) {
    return this.usersClient
      .send(START_GAME, gameSessionPayload)
      .pipe(tap((res) => res));
  }
}

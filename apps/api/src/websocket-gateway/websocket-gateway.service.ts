import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IGameRound } from 'apps/users/src/game-round/interfaces/game-round.interface';
import { START_GAME } from '@app/common/constants/messages';
import { tap } from 'rxjs';
import { USERS_SERVICE } from '@app/common/constants';

@Injectable()
export class WebsocketGatewayService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
  ) {}
  async roundStarted(gameRoundPayload: IGameRound) {
    return this.usersClient
      .send(START_GAME, gameRoundPayload)
      .pipe(tap((res) => res));
  }
}

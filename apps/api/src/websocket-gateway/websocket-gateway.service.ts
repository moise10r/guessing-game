import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_SERVICE } from '@app/common/constants';
import { RankPlayer } from '@app/common/interfaces/rank-player.interface';
import { PERSIST_PLAYER } from '@app/common/constants/messages';

@Injectable()
export class WebsocketGatewayService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
  ) {}
  savePlayer(player: RankPlayer): void {
    this.usersClient.emit(PERSIST_PLAYER, player);
  }
}

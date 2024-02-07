import { USERS_SERVICE } from '@app/common/constants';
import { PERSIST_PLAYER } from '@app/common/constants/messages';
import { PlayerDto } from '@app/common/dto/player.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { tap } from 'rxjs';

@Injectable()
export class ApiService {
  // constructor(
  //   @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
  // ) {}
  // async createPlayer(playerPayload: PlayerDto) {
  //   return this.usersClient
  //     .send(PERSIST_PLAYER, playerPayload)
  //     .pipe(tap((res) => res));
  // }
}

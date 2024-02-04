import { USERS_SERVICE } from '@app/common/constants';
import { PlayerDto } from '@app/common/dto/player.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
  ) {}

  async createPlayer(player: PlayerDto) {
    await lastValueFrom(this.usersClient.emit('create_player', player));
  }
}

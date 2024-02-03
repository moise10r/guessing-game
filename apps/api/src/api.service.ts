import { USERS_SERVICE } from '@app/common/constants';
import { PlayerDto } from '@app/common/dto/player.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiService {
  constructor(
    @Inject(USERS_SERVICE) private readonly playersClient: ClientProxy,
  ) {}

  async createPlayer(player: PlayerDto) {
    try {
      this.playersClient.send('create_player', player);
    } catch (error) {
      throw error;
    }
  }
}

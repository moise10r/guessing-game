import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './repositories/player.repository';
import { PlayerDto } from '@app/common/dto/player.dto';

@Injectable()
export class PlayersService {
  constructor(private readonly playerRepository: PlayerRepository) {}
  async create(playerPayload: PlayerDto) {
    console.log('playerPayload', playerPayload);
    try {
      console.log('playerPayload', playerPayload);
      const player = await this.playerRepository.findOne({
        name: playerPayload.name,
      });
      if (player) {
        return player;
      }
      const newPlayer = await this.playerRepository.create(playerPayload);
      if (newPlayer) {
        return newPlayer;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

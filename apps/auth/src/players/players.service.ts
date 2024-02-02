import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './repositories/player.repository';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { DEFAULT_SCORE } from './constant';

@Injectable()
export class PlayersService {
  constructor(protected readonly playerRepository: PlayerRepository) {}
  async create(player: CreatePlayerDto) {
    return await this.playerRepository.create({
      ...player,
      score: DEFAULT_SCORE,
    });
  }
}

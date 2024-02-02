import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './repositories/player.repository';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlayersService {
  constructor(
    protected readonly playerRepository: PlayerRepository,
    protected readonly configService: ConfigService,
  ) {}
  async create(player: CreatePlayerDto) {
    return await this.playerRepository.create({
      ...player,
      score: this.configService.get('DEFAULT_SCORE'),
    });
  }
}

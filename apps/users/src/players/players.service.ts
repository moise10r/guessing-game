import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './repositories/player.repository';
import { DEFAULT_SCORE } from './constant';
import { PlayerDto } from '@app/common/dto/player.dto';
import { JoinedPlayersService } from '../joined-player/joined-player.service';

@Injectable()
export class PlayersService {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly joinedPlayersService: JoinedPlayersService,
  ) {}
  async create(player: PlayerDto) {
    try {
      const newPlayer = await this.playerRepository.create({
        ...player,
        score: DEFAULT_SCORE,
      });
      if (newPlayer) {
        this.joinedPlayersService.addJoinedPlayer(player);
        return newPlayer;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

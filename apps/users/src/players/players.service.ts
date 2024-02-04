import { BadRequestException, Injectable } from '@nestjs/common';
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
  async create(playerPayload: PlayerDto) {
    try {
      const player = await this.playerRepository.findOne({
        name: playerPayload.name,
      });
      if (player) {
        return new BadRequestException('Player exist already', {
          cause: new Error(),
          description: 'Player exist already',
        });
      }
      const newPlayer = await this.playerRepository.create({
        ...playerPayload,
        score: DEFAULT_SCORE,
      });
      if (newPlayer) {
        this.joinedPlayersService.addJoinedPlayer(newPlayer);
        return newPlayer;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

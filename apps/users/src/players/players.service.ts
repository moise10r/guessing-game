import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './repositories/player.repository';
import { DEFAULT_SCORE } from './constant';
import { JoinedPlayersService } from '../joined-player/joined-player.service';
import { IPlayer } from 'libs/common/interfaces/player.interface';

@Injectable()
export class PlayersService {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly joinedPlayersService: JoinedPlayersService,
  ) {}
  async create(playerPayload: IPlayer) {
    try {
      // this needs to be changed
      console.log('playerPayload', playerPayload);

      const player = (await this.playerRepository.findOne({
        name: playerPayload.name,
      })) as unknown as IPlayer;
      if (player) {
        this.joinedPlayersService.addJoinedPlayer(player);
        return player;
      }
      // this needs to be changed
      const newPlayer = (await this.playerRepository.create({
        ...playerPayload,
        score: DEFAULT_SCORE,
      })) as unknown as IPlayer;
      if (newPlayer) {
        this.joinedPlayersService.addJoinedPlayer(newPlayer);
        return newPlayer;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

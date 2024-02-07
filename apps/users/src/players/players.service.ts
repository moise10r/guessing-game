import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './repositories/player.repository';
import { PlayerDto } from '@app/common/dto/player.dto';

@Injectable()
export class PlayersService {
  constructor(private readonly playerRepository: PlayerRepository) {}
  async create(playerPayload: PlayerDto) {
    console.log('playerPayload', playerPayload);

    // try {
    //   // this needs to be changed
    //   console.log('playerPayload', playerPayload);
    //   const player = (await this.playerRepository.findOne({
    //     name: playerPayload.name,
    //   })) as unknown as IPlayer;
    //   if (player) {
    //     this.joinedPlayersService.addJoinedPlayer(player);
    //     return player;
    //   }
    //   // this needs to be changed
    //   const newPlayer = (await this.playerRepository.create({
    //     ...playerPayload,
    //     score: DEFAULT_SCORE,
    //   })) as unknown as IPlayer;
    //   if (newPlayer) {
    //     this.joinedPlayersService.addJoinedPlayer(newPlayer);
    //     return newPlayer;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }
}

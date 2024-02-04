import { Injectable } from '@nestjs/common';
import { IPlayer } from 'libs/common/interfaces/player.interface';

@Injectable()
export class JoinedPlayersService {
  private joinedPlayersMap: Map<string, IPlayer> = new Map();

  addJoinedPlayer(player: IPlayer): void {
    this.joinedPlayersMap.set(player.name, player);
  }

  getJoinedPlayers(): IPlayer[] {
    return Array.from(this.joinedPlayersMap.values());
  }
}

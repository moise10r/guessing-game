import { PlayerDto } from '@app/common/dto/player.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JoinedPlayersService {
  private joinedPlayersMap: Map<string, PlayerDto> = new Map();

  addJoinedPlayer(player: PlayerDto): void {
    this.joinedPlayersMap.set(player.name, player);
  }

  getJoinedPlayers(): PlayerDto[] {
    return Array.from(this.joinedPlayersMap.values());
  }
}

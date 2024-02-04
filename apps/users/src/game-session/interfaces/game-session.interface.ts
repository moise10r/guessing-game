import { PlayerDto } from '@app/common/dto/player.dto';

export interface IGameSession {
  players: PlayerDto[];
  freezePoint: number;
}

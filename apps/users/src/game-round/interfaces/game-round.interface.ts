import { IPlayer } from '@app/common/interfaces/player.interface';

export interface IGameRound {
  players: IPlayer[];
  freezePoint: number;
}

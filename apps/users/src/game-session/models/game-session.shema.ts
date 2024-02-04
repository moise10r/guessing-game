import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { PlayerSchema } from '../../players/models/player.schema';
import { IPlayer } from 'libs/common/interfaces/player.interface';

@Schema({
  versionKey: false,
})
export class GameSessionDocument extends AbstractDocument {
  @Prop({
    type: [{ type: PlayerSchema }],
    default: [],
  })
  players: IPlayer[];
  @Prop({
    type: Number,
    default: 0,
  })
  freezePoint: number;
}

export const GameSessionSchema =
  SchemaFactory.createForClass(GameSessionDocument);

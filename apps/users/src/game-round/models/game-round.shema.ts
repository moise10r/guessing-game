import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { PlayerSchema } from '../../players/models/player.schema';
import { IPlayer } from '@app/common/interfaces/player.interface';

@Schema({
  versionKey: false,
})
export class GameRoundDocument extends AbstractDocument {
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
PlayerSchema.index({ name: 1 }, { unique: false });
export const GameRoundSchema = SchemaFactory.createForClass(GameRoundDocument);

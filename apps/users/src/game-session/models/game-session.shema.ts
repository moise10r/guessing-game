import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { PlayerDto } from '@app/common/dto/player.dto';
import { PlayerSchema } from '../../players/models/player.schema';

@Schema({
  versionKey: false,
})
export class GameSessionDocument extends AbstractDocument {
  @Prop({
    type: [{ type: PlayerSchema }],
    default: [],
  })
  players: PlayerDto[];
  @Prop({
    type: Number,
    default: 0,
  })
  freezePoint: number;
}

export const GameSessionSchema =
  SchemaFactory.createForClass(GameSessionDocument);

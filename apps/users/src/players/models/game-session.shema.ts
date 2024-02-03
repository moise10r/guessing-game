import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlayerDocument, PlayerSchema } from './player.schema';
import { AbstractDocument } from '@app/common/database/abstract.schema';

@Schema({
  versionKey: false,
})
export class GameSectionDocument extends AbstractDocument {
  @Prop({
    type: [{ type: PlayerSchema }],
    default: [],
  })
  players: PlayerDocument[];
}

export const GameSectionSchema =
  SchemaFactory.createForClass(GameSectionDocument);

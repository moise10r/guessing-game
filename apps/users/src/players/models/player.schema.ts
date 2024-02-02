import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class PlayerDocument extends AbstractDocument {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  score: number;
}

export const PlayerSchema = SchemaFactory.createForClass(PlayerDocument);

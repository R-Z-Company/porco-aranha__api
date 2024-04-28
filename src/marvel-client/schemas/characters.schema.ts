import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharactersDocument = HydratedDocument<Characters>;

@Schema()
export class Characters {
  @Prop()
  id: number;

  @Prop()
  idComic: number;

  @Prop()
  fullName: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;
}

export const CharactersSchema = SchemaFactory.createForClass(Characters);

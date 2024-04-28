import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreatorsDocument = HydratedDocument<Creators>;

@Schema()
export class Creators {
  @Prop()
  id: number;

  @Prop()
  idComic: number;

  @Prop()
  name: string;

  @Prop()
  role: string;
}

export const CreatorsSchema = SchemaFactory.createForClass(Creators);

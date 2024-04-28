import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ComicsDocument = HydratedDocument<Comics>;

@Schema()
export class Comics {
  @Prop()
  id: number;

  @Prop()
  idSerie: number;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  isbn: string;

  @Prop()
  focDate: string;

  @Prop()
  thumbnail: string;
}

export const ComicsSchema = SchemaFactory.createForClass(Comics);

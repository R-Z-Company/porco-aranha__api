import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SeriesDocument = HydratedDocument<Series>;

@Schema()
export class Series {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  duration: string;

  @Prop()
  thumbnail: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);

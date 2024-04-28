import { Module } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { ComicsController } from './comics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comics, ComicsSchema } from '../marvel-client/schemas/comics.schema';
import {
  Creators,
  CreatorsSchema,
} from '../marvel-client/schemas/creators.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comics.name, schema: ComicsSchema }]),
    MongooseModule.forFeature([
      { name: Creators.name, schema: CreatorsSchema },
    ]),
  ],
  controllers: [ComicsController],
  providers: [ComicsService],
})
export class ComicsModule {}

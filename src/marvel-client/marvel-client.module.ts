import { Module } from '@nestjs/common';
import { MarvelClientService } from './marvel-client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MarvelClientController } from './marvel-client.controller';
import { MarvelSeriesService } from './services/marvel-series.service';
import { MarvelComicsService } from './services/marvel-comics.service';
import { MarvelCreatorsService } from './services/marvel-creators.service';
import { MarvelCharactersService } from './services/marvel-characters.service';
import { Series, SeriesSchema } from './schemas/series.schema';
import { Comics, ComicsSchema } from './schemas/comics.schema';
import { Creators, CreatorsSchema } from './schemas/creators.schema';
import { Characters, CharactersSchema } from './schemas/characters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Series.name, schema: SeriesSchema },
      { name: Comics.name, schema: ComicsSchema },
      { name: Creators.name, schema: CreatorsSchema },
      { name: Characters.name, schema: CharactersSchema },
    ]),
  ],
  controllers: [MarvelClientController],
  exports: [MarvelClientService],
  providers: [
    MarvelClientService,
    MarvelSeriesService,
    MarvelComicsService,
    MarvelCreatorsService,
    MarvelCharactersService,
  ],
})
export class MarvelClientModule {}

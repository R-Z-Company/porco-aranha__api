import { Injectable, OnModuleInit } from '@nestjs/common';
import { MarvelSeriesService } from './services/marvel-series.service';
import { MarvelComicsService } from './services/marvel-comics.service';
import { MarvelCreatorsService } from './services/marvel-creators.service';
import { MarvelCharactersService } from './services/marvel-characters.service';

@Injectable()
export class MarvelClientService implements OnModuleInit {
  constructor(
    private marvelSeriesService: MarvelSeriesService,
    private marvelComicsService: MarvelComicsService,
    private marvelCreatorsService: MarvelCreatorsService,
    private marvelCharactersService: MarvelCharactersService,
  ) {}

  async onModuleInit() {}

  public async initApp() {
    await this.marvelSeriesService.saveMarvelSeries();
    const { id, comics } = await this.marvelSeriesService.getMarvelSeries();

    await this.marvelComicsService.saveMarvelSeries(comics, id);
    const marvelComics = await this.marvelComicsService.getMarvelComics(comics);

    await this.marvelCreatorsService.saveMarvelCreators(marvelComics);

    await this.marvelCharactersService.saveMarvelCharacters(marvelComics);
  }
}

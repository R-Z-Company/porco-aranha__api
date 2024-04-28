import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SECRET_PARAM_URL } from '../constants/secret-param-url.constant';
import { axiosClient } from '../client/axios.client';
import { ComicsResultInterface } from '../interfaces/comics-result.interface';
import { ComicsInterface } from '../../interfaces/comics.interface';
import { buildThumbnailUrl } from '../../utils/build-thumbnail-url.util';
import { Comics } from '../schemas/comics.schema';

@Injectable()
export class MarvelComicsService {
  constructor(@InjectModel(Comics.name) private comicsModel: Model<Comics>) {}

  public async saveMarvelSeries(comicsToFetch: string[], idSerie: number) {
    const marvelSeries = await this.fetchMarvelComics(comicsToFetch);
    const seriesData = this.buildDataForDatabase(marvelSeries, idSerie);

    return this.comicsModel.insertMany(seriesData);
  }

  public async getMarvelComics(comicsToFetch: string[]) {
    const marvelSeries = await this.fetchMarvelComics(comicsToFetch);
    return this.buildDataToGetCharAndCreators(marvelSeries);
  }

  private async fetchMarvelComics(
    comicsToFetch: string[],
  ): Promise<ComicsInterface[]> {
    const comicsData = comicsToFetch.map(async (comic: string) => {
      const resourceUrl = comic + SECRET_PARAM_URL;

      const {
        data: {
          data: { results: comicsData },
        },
      } = await axiosClient.get<ComicsResultInterface>(resourceUrl);

      return comicsData;
    });

    return await Promise.all(comicsData);
  }

  private buildDataForDatabase(comicsData: ComicsInterface[], idSerie: number) {
    return comicsData.flat().map((comic) => {
      const focDate = comic.dates.find((date) => date.type === 'focDate');
      const thumbnail = buildThumbnailUrl(comic.thumbnail);

      return {
        id: comic.id,
        idSerie,
        title: comic.title,
        description: comic.description,
        isbn: comic.isbn,
        focDate: focDate.date,
        thumbnail,
      };
    });
  }

  private buildDataToGetCharAndCreators(comicsData: ComicsInterface[]) {
    return comicsData.flat().map((comic) => {
      const creators = comic.creators.items.map(({ name, role }) => ({
        name,
        role,
      }));
      const characters = comic.characters.collectionURI;

      return {
        idComic: comic.id,
        creators,
        characters,
      };
    });
  }
}

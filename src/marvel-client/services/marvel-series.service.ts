import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BASE_URL } from '../constants/base-url.constant';
import { SPIDER_VERSE_SERIE_ID } from '../constants/spider-verse-serie-id.constant';
import { SECRET_PARAM_URL } from '../constants/secret-param-url.constant';
import { axiosClient } from '../client/axios.client';
import { SeriesResultInterface } from '../interfaces/series-result.interface';
import { buildThumbnailUrl } from '../../utils/build-thumbnail-url.util';
import { SeriesInterface } from '../../interfaces/series.interface';
import { Series } from '../schemas/series.schema';

@Injectable()
export class MarvelSeriesService {
  constructor(@InjectModel(Series.name) private seriesModel: Model<Series>) {}

  public async saveMarvelSeries() {
    const marvelSeries = await this.fetchMarvelSeries();
    const seriesData = this.buildDataForDatabase(marvelSeries[0]);

    return new this.seriesModel(seriesData).save();
  }

  public async getMarvelSeries() {
    const marvelSeries = await this.fetchMarvelSeries();
    return this.buildDataForGetComics(marvelSeries[0]);
  }

  private async fetchMarvelSeries() {
    const resourceUrl = `${BASE_URL}/series/${SPIDER_VERSE_SERIE_ID}${SECRET_PARAM_URL}`;

    const {
      data: {
        data: { results: seriesData },
      },
    } = await axiosClient.get<SeriesResultInterface>(resourceUrl);

    return seriesData;
  }

  private buildDataForDatabase(seriesData: SeriesInterface) {
    const duration = `${seriesData.startYear} - ${seriesData.endYear}`;
    const thumbnail = buildThumbnailUrl(seriesData.thumbnail);

    return {
      id: seriesData.id,
      title: seriesData.title,
      description: seriesData.description,
      duration,
      thumbnail,
    };
  }

  private buildDataForGetComics(seriesData: SeriesInterface) {
    const comics = seriesData.comics.items.map(
      ({ resourceURI }) => resourceURI,
    );

    return {
      id: seriesData.id,
      comics,
    };
  }
}

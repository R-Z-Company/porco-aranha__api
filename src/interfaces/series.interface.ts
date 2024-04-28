import { ThumbnailInterface } from '../marvel-client/interfaces/thumbnail.interface';

export interface SeriesInterface {
  id: number;
  title: string;
  description: string;
  startYear: number;
  endYear: number;
  thumbnail: ThumbnailInterface;
  comics: {
    items: {
      resourceURI: string;
    }[];
  };
}

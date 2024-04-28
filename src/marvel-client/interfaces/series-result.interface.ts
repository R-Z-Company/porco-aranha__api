import { MarvelClientBaseInterface } from './marvel-client-base.interface';
import { SeriesInterface } from '../../interfaces/series.interface';

export interface SeriesResultInterface
  extends MarvelClientBaseInterface<SeriesInterface[]> {}

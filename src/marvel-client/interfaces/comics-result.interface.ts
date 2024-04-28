import { ComicsInterface } from '../../interfaces/comics.interface';
import { MarvelClientBaseInterface } from './marvel-client-base.interface';

export interface ComicsResultInterface
  extends MarvelClientBaseInterface<ComicsInterface> {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Creators } from '../schemas/creators.schema';

@Injectable()
export class MarvelCreatorsService {
  constructor(
    @InjectModel(Creators.name) private creatorsModel: Model<Creators>,
  ) {}

  public async saveMarvelCreators(marvelComics: any[]) {
    const creators = this.getCreatorsData(marvelComics);
    return this.creatorsModel.insertMany(creators);
  }

  private getCreatorsData(marvelComics: any[]) {
    const allCreators = [];

    marvelComics.forEach(({ creators, idComic }) => {
      const creatorsWithId = creators.map((creator) => ({
        name: creator.name,
        role: creator.role,
        idComic: idComic,
      }));

      allCreators.push(...creatorsWithId);
    });

    return allCreators;
  }
}

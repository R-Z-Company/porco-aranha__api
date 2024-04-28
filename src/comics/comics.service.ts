import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comics } from '../marvel-client/schemas/comics.schema';
import { Model } from 'mongoose';
import { Creators } from '../marvel-client/schemas/creators.schema';

@Injectable()
export class ComicsService {
  constructor(
    @InjectModel(Comics.name) private comicsModel: Model<Comics>,
    @InjectModel(Creators.name) private creatorsModel: Model<Creators>,
  ) {}

  async findAll() {
    const comics = await this.comicsModel.find().select('-_id -__v');
    const creators = await this.creatorsModel.find().select('-_id -__v');

    return comics.map((comic) => {
      const matchingCreators = creators.filter(
        (creator) => creator.idComic === comic.id,
      );

      return { ...comic.toObject(), creators: matchingCreators };
    });
  }

  async findAllByIdComic(id: number) {
    return this.comicsModel.find({ id }).select('-_id -__v');
  }

  async findOne(id: number) {
    const comic = await this.comicsModel.findOne({ id }).select('-_id -__v');
    const creators = await this.creatorsModel.find().select('-_id -__v');

    const matchingCreators = creators.filter(
      (creator) => creator.idComic === comic.id,
    );

    return { ...comic.toObject(), creators: matchingCreators };
  }
}

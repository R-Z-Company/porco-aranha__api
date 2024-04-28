import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Characters } from '../marvel-client/schemas/characters.schema';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Characters.name) private charactersModel: Model<Characters>,
  ) {}

  async findAll(): Promise<Characters[]> {
    const allFullNames = await this.charactersModel.find().distinct('fullName');

    const uniqueCharacters = [];
    for (const fullName of allFullNames) {
      const character = await this.charactersModel.findOne({ fullName });
      uniqueCharacters.push(character);
    }

    return uniqueCharacters;
  }

  findAllByIdComic(idComic: number) {
    return this.charactersModel.find({ idComic }).select('-_id -__v');
  }

  findOne(id: number) {
    return this.charactersModel.findOne({
      id,
    });
  }
}

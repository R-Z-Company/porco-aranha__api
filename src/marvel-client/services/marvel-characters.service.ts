import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { axiosClient } from '../client/axios.client';
import { SECRET_PARAM_URL } from '../constants/secret-param-url.constant';
import { buildThumbnailUrl } from '../../utils/build-thumbnail-url.util';
import { Characters } from '../schemas/characters.schema';

@Injectable()
export class MarvelCharactersService {
  constructor(
    @InjectModel(Characters.name) private charactersModel: Model<Characters>,
  ) {}

  public async saveMarvelCharacters(marvelComics: any[]) {
    const marvelCharacters = await this.fetchMarvelCharacters(marvelComics);
    await this.charactersModel.insertMany(marvelCharacters.flat());
  }

  private async fetchMarvelCharacters(marvelComics: any[]) {
    const marvelComicsData = marvelComics.map(
      async ({ characters, idComic }) => {
        const {
          data: {
            data: { results: marvelCharacters },
          },
        } = await axiosClient.get(characters + SECRET_PARAM_URL);

        if (marvelCharacters.length === 0) return [];

        return marvelCharacters.map((character) => ({
          id: character.id,
          idComic,
          fullName: character.name,
          description: character.description,
          thumbnail: buildThumbnailUrl(character.thumbnail),
        }));
      },
    );

    return await Promise.all(marvelComicsData);
  }
}

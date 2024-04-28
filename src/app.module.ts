import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarvelClientModule } from './marvel-client/marvel-client.module';
import { CharactersModule } from './characters/characters.module';
import { ComicsModule } from './comics/comics.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/porco-aranha'),
    MarvelClientModule,
    CharactersModule,
    ComicsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

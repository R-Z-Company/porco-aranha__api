import { Controller, Get, Param } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get('comic/:idComic')
  findAllByIdComic(@Param('idComic') idComic: number) {
    return this.charactersService.findAllByIdComic(idComic);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }
}

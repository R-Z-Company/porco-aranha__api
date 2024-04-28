import { Controller, Get, Param } from '@nestjs/common';
import { ComicsService } from './comics.service';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get()
  findAll() {
    return this.comicsService.findAll();
  }

  @Get('all/:id')
  findAllByIdComic(@Param('id') id: number) {
    return this.comicsService.findAllByIdComic(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comicsService.findOne(+id);
  }
}

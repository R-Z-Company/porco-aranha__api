import { Controller, Get } from '@nestjs/common';
import { MarvelClientService } from './marvel-client.service';

@Controller('marvel')
export class MarvelClientController {
  constructor(private readonly marvelClientService: MarvelClientService) {}

  @Get()
  async getSeries() {
    return await this.marvelClientService.initApp();
  }
}

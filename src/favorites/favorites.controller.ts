import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post('/artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteArtist(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('/track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteTrack(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumsService.getById(id);
  }

  @Post()
  create(@Body() createUserDTO: CreateAlbumDTO) {
    return this.albumsService.create(createUserDTO);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDTO: CreateAlbumDTO,
  ) {
    return this.albumsService.update(id, updatePasswordDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() id: string) {
    return this.albumsService.delete(id);
  }
}

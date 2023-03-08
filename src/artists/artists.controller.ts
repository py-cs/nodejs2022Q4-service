import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() createUserDTO: CreateArtistDTO) {
    return this.artistsService.create(createUserDTO);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDTO: CreateArtistDTO,
  ) {
    return this.artistsService.update(id, updatePasswordDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.delete(id);
  }
}

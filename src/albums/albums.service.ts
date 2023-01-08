import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { Album } from './album.inerface';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(private tracksService: TracksService) {}

  getAll(): Album[] {
    return this.albums;
  }

  getById(id: string): Album {
    const Album = this.albums.find((Album) => Album.id === id);
    if (!Album) {
      throw new NotFoundException('Album not found');
    }
    return Album;
  }

  create(createAlbumDTO: CreateAlbumDTO): Album {
    const id = uuidv4();
    const album: Album = {
      ...createAlbumDTO,
      id,
      artistId: createAlbumDTO.artistId || null,
    };
    this.albums.push(album);
    return album;
  }

  update(id: string, updateAlbumDTO: CreateAlbumDTO): Album {
    const album = this.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const updatedAlbum = { ...album, ...updateAlbumDTO };
    this.albums = this.albums.map((album) =>
      album.id === updatedAlbum.id ? updatedAlbum : album,
    );
    return updatedAlbum;
  }

  delete(id: string): void {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.albums = this.albums.filter((album) => album.id !== id);
    const tracksByAlbum = this.tracksService
      .getAll()
      .filter((track) => track.albumId === id);
    tracksByAlbum.forEach(({ id, name, duration, artistId }) =>
      this.tracksService.update(id, { name, duration, artistId }),
    );
  }
}

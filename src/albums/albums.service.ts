import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { Album } from './album.inerface';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

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
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }
    this.albums.splice(albumIndex, 1);
  }
}

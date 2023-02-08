import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma.service';
import { Favorites } from './favorites.inerface';

@Injectable()
export class FavoritesService {
  private favoriteIds: Favorites = { albums: [], artists: [], tracks: [] };

  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.favorites.findFirst({
      where: { id: true },
      include: { albums: {}, artists: {}, tracks: {} },
    });
  }

  addArtist(id: string) {
    this.prismaService.artist.update({
      where: { id },
      data: { isFavorite: true },
    });
  }

  deleteArtist(id: string) {
    this.prismaService.artist.update({
      where: { id },
      data: { isFavorite: false },
    });
  }

  addAlbum(id: string) {
    this.prismaService.album.update({
      where: { id },
      data: { isFavorite: true },
    });
  }

  deleteAlbum(id: string) {
    this.prismaService.album.update({
      where: { id },
      data: { isFavorite: false },
    });
  }

  addTrack(id: string) {
    this.prismaService.track.update({
      where: { id },
      data: { isFavorite: true },
    });
  }

  deleteTrack(id: string) {
    this.prismaService.track.update({
      where: { id },
      data: { isFavorite: false },
    });
  }
}

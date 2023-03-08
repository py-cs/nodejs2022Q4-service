import { Injectable } from '@nestjs/common';
import { errors } from '../common/utils/errors';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.favorites.findFirst({
      where: { id: true },
      select: {
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        artists: { select: { id: true, name: true, grammy: true } },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            albumId: true,
            artistId: true,
          },
        },
      },
    });
  }

  async addArtist(id: string) {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: true },
      });
    } catch {
      throw errors.unableToAddToFavorites('Artist', id);
    }
  }

  async deleteArtist(id: string) {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: false },
      });
    } catch {
      throw errors.notFound('Artist', id);
    }
  }

  async addAlbum(id: string) {
    try {
      await this.prisma.album.update({
        where: { id },
        data: { isFavorite: true },
      });
    } catch {
      throw errors.unableToAddToFavorites('Album', id);
    }
  }

  async deleteAlbum(id: string) {
    try {
      await this.prisma.album.update({
        where: { id },
        data: { isFavorite: false },
      });
    } catch {
      throw errors.notFound('Album', id);
    }
  }

  async addTrack(id: string) {
    try {
      await this.prisma.track.update({
        where: { id },
        data: { isFavorite: true },
      });
    } catch {
      throw errors.unableToAddToFavorites('Track', id);
    }
  }

  async deleteTrack(id: string) {
    try {
      await this.prisma.track.update({
        where: { id },
        data: { isFavorite: false },
      });
    } catch {
      throw errors.notFound('Track', id);
    }
  }
}

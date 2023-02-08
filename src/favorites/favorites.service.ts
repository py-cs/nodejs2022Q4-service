import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.favorites.findFirst({
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
      await this.prismaService.artist.update({
        where: { id },
        data: { isFavorite: true },
      });
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async deleteArtist(id: string) {
    try {
      await this.prismaService.artist.update({
        where: { id },
        data: { isFavorite: null },
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async addAlbum(id: string) {
    try {
      await this.prismaService.album.update({
        where: { id },
        data: { isFavorite: true },
      });
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async deleteAlbum(id: string) {
    try {
      await this.prismaService.album.update({
        where: { id },
        data: { isFavorite: null },
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async addTrack(id: string) {
    try {
      await this.prismaService.track.update({
        where: { id },
        data: { isFavorite: true },
      });
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async deleteTrack(id: string) {
    try {
      await this.prismaService.track.update({
        where: { id },
        data: { isFavorite: null },
      });
    } catch {
      throw new NotFoundException();
    }
  }
}

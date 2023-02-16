import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { Album } from './album.inerface';
import { PrismaService } from '../database/prisma.service';

const select = {
  id: true,
  name: true,
  year: true,
  artistId: true,
};

@Injectable()
export class AlbumsService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Album[]> {
    return this.prismaService.album.findMany({ select });
  }

  async getById(id: string): Promise<Album> {
    const album = await this.prismaService.album.findFirst({
      where: { id },
      select,
    });
    if (!album) throw new NotFoundException();
    return album;
  }

  create(createAlbumDTO: CreateAlbumDTO): Promise<Album> {
    return this.prismaService.album.create({
      data: createAlbumDTO,
      select,
    });
  }

  async update(id: string, updateAlbumDTO: CreateAlbumDTO): Promise<Album> {
    try {
      return await this.prismaService.album.update({
        where: { id },
        data: updateAlbumDTO,
        select,
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaService.album.delete({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }
}

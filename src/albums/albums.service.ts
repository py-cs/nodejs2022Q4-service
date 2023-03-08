import { Injectable } from '@nestjs/common';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { Album } from './album.inerface';
import { PrismaService } from '../database/prisma.service';
import { errors } from '../common/utils/errors';

const select = {
  id: true,
  name: true,
  year: true,
  artistId: true,
};

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<Album[]> {
    return this.prisma.album.findMany({ select });
  }

  async getById(id: string): Promise<Album> {
    const album = await this.prisma.album.findFirst({
      where: { id },
      select,
    });
    if (!album) throw errors.notFound('Album', id);
    return album;
  }

  create(createAlbumDTO: CreateAlbumDTO): Promise<Album> {
    return this.prisma.album.create({
      data: createAlbumDTO,
      select,
    });
  }

  async update(id: string, updateAlbumDTO: CreateAlbumDTO): Promise<Album> {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: updateAlbumDTO,
        select,
      });
    } catch {
      throw errors.notFound('Album', id);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch {
      throw errors.notFound('Album', id);
    }
  }
}

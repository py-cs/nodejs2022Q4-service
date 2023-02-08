import { Injectable } from '@nestjs/common';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { Album } from './album.inerface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Album[]> {
    return this.prismaService.album.findMany();
  }

  getById(id: string): Promise<Album> {
    return this.prismaService.album.findUniqueOrThrow({ where: { id } });
  }

  create(createAlbumDTO: CreateAlbumDTO): Promise<Album> {
    return this.prismaService.album.create({
      data: createAlbumDTO,
    });
  }

  update(id: string, updateAlbumDTO: CreateAlbumDTO): Promise<Album> {
    return this.prismaService.album.update({
      where: { id },
      data: updateAlbumDTO,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.album.delete({ where: { id } });
  }
}

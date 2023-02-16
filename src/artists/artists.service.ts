import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { Artist } from './artist.inerface';
import { PrismaService } from '../database/prisma.service';

const select = {
  id: true,
  name: true,
  grammy: true,
};

@Injectable()
export class ArtistsService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Artist[]> {
    return this.prismaService.artist.findMany({ select });
  }

  async getById(id: string): Promise<Artist> {
    const artist = await this.prismaService.artist.findFirst({
      where: { id },
      select,
    });
    if (!artist) throw new NotFoundException();
    return artist;
  }

  create(createArtistDTO: CreateArtistDTO): Promise<Artist> {
    return this.prismaService.artist.create({
      data: createArtistDTO,
      select,
    });
  }

  async update(id: string, updateArtistDTO: CreateArtistDTO): Promise<Artist> {
    try {
      return await this.prismaService.artist.update({
        where: { id },
        data: updateArtistDTO,
        select,
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaService.artist.delete({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }
}

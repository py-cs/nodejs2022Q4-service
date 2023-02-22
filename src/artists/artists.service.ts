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
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany({ select });
  }

  async getById(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findFirst({
      where: { id },
      select,
    });
    if (!artist) throw new NotFoundException();
    return artist;
  }

  create(createArtistDTO: CreateArtistDTO): Promise<Artist> {
    return this.prisma.artist.create({
      data: createArtistDTO,
      select,
    });
  }

  async update(id: string, updateArtistDTO: CreateArtistDTO): Promise<Artist> {
    try {
      return await this.prisma.artist.update({
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
      await this.prisma.artist.delete({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }
}

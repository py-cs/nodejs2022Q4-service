import { Injectable } from '@nestjs/common';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { Artist } from './artist.inerface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Artist[]> {
    return this.prismaService.artist.findMany();
  }

  getById(id: string): Promise<Artist> {
    return this.prismaService.artist.findUniqueOrThrow({ where: { id } });
  }

  create(createArtistDTO: CreateArtistDTO): Promise<Artist> {
    return this.prismaService.artist.create({
      data: createArtistDTO,
    });
  }

  update(id: string, updateArtistDTO: CreateArtistDTO): Promise<Artist> {
    return this.prismaService.artist.update({
      where: { id },
      data: updateArtistDTO,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.artist.delete({ where: { id } });
  }
}

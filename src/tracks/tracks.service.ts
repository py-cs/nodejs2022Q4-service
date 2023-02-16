import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTrackDTO } from './dto/create-track.dto';
import { Track } from './track.interface';

const select = {
  id: true,
  name: true,
  duration: true,
  artistId: true,
  albumId: true,
};

@Injectable()
export class TracksService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Track[]> {
    return this.prismaService.track.findMany({ select });
  }

  async getById(id: string): Promise<Track> {
    const track = await this.prismaService.track.findFirst({
      where: { id },
      select,
    });
    if (!track) throw new NotFoundException();
    return track;
  }

  create(createTrackDTO: CreateTrackDTO): Promise<Track> {
    return this.prismaService.track.create({
      data: createTrackDTO,
      select,
    });
  }

  async update(id: string, updateTrackDTO: CreateTrackDTO): Promise<Track> {
    try {
      return await this.prismaService.track.update({
        where: { id },
        data: updateTrackDTO,
        select,
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaService.track.delete({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }
}

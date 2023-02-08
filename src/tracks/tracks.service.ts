import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTrackDTO } from './dto/create-track.dto';
import { Track } from './track.interface';

@Injectable()
export class TracksService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Track[]> {
    return this.prismaService.track.findMany();
  }

  async getById(id: string): Promise<Track> {
    const track = await this.prismaService.track.findFirst({ where: { id } });
    if (!track) throw new NotFoundException();
    return track;
  }

  create(createTrackDTO: CreateTrackDTO): Promise<Track> {
    return this.prismaService.track.create({
      data: createTrackDTO,
    });
  }

  async update(id: string, updateTrackDTO: CreateTrackDTO): Promise<Track> {
    try {
      return await this.prismaService.track.update({
        where: { id },
        data: updateTrackDTO,
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

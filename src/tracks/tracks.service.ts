import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTrackDTO } from './dto/create-track.dto';
import { Track } from './track.interface';

@Injectable()
export class TracksService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Track[]> {
    return this.prismaService.track.findMany();
  }

  getById(id: string): Promise<Track> {
    return this.prismaService.track.findUniqueOrThrow({ where: { id } });
  }

  create(createTrackDTO: CreateTrackDTO): Promise<Track> {
    return this.prismaService.track.create({
      data: createTrackDTO,
    });
  }

  update(id: string, updateTrackDTO: CreateTrackDTO): Promise<Track> {
    return this.prismaService.track.update({
      where: { id },
      data: updateTrackDTO,
    });
  }

  async delete(id: string): Promise<void> {
    this.prismaService.track.delete({ where: { id } });
  }
}

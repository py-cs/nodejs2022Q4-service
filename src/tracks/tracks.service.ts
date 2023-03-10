import { Injectable } from '@nestjs/common';
import { errors } from '../common/utils/errors';
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
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<Track[]> {
    return this.prisma.track.findMany({ select });
  }

  async getById(id: string): Promise<Track> {
    const track = await this.prisma.track.findFirst({
      where: { id },
      select,
    });
    if (!track) throw errors.notFound('Track', id);

    return track;
  }

  create(createTrackDTO: CreateTrackDTO): Promise<Track> {
    return this.prisma.track.create({
      data: createTrackDTO,
      select,
    });
  }

  async update(id: string, updateTrackDTO: CreateTrackDTO): Promise<Track> {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: updateTrackDTO,
        select,
      });
    } catch {
      throw errors.notFound('Track', id);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch {
      throw errors.notFound('Track', id);
    }
  }
}

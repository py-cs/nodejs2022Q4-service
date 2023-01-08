import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDTO } from './dto/create-track.dto';
import { Track } from './track.interface';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  getAll(): Track[] {
    return this.tracks;
  }

  getById(id: string): Track {
    const track = this.tracks.find((Track) => Track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  create(createTrackDTO: CreateTrackDTO): Track {
    const id = uuidv4();
    const track: Track = {
      ...createTrackDTO,
      id,
      artistId: createTrackDTO.artistId || null,
      albumId: createTrackDTO.albumId || null,
    };
    this.tracks.push(track);
    return track;
  }

  update(id: string, updateTrackDTO: CreateTrackDTO): Track {
    const track = this.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const updatedTrack = { ...track, ...updateTrackDTO };
    this.tracks = this.tracks.map((track) =>
      track.id === updatedTrack.id ? updatedTrack : track,
    );
    return updatedTrack;
  }

  delete(id: string): void {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    this.tracks = this.tracks.filter((track) => track.id !== id);

    try {
      this.favoritesService.deleteTrack(id);
    } catch (_) {}
  }
}

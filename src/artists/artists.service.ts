import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { Artist } from './artist.inerface';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  getAll(): Artist[] {
    return this.artists;
  }

  getById(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  create(createArtistDTO: CreateArtistDTO): Artist {
    const id = uuidv4();
    const Artist: Artist = {
      ...createArtistDTO,
      id,
    };
    this.artists.push(Artist);
    return Artist;
  }

  update(id: string, updateArtistDTO: CreateArtistDTO): Artist {
    const artist = this.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    const updatedArtist = { ...artist, ...updateArtistDTO };
    this.artists = this.artists.map((artist) =>
      artist.id === updatedArtist.id ? updatedArtist : artist,
    );
    return updatedArtist;
  }

  delete(id: string): void {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.artists = this.artists.filter((artist) => artist.id !== id);

    const albumsByArtist = this.albumsService
      .getAll()
      .filter((album) => album.artistId === id);
    albumsByArtist.forEach((track) => (track.artistId = null));

    const tracksByArtist = this.tracksService
      .getAll()
      .filter((track) => track.artistId === id);
    tracksByArtist.forEach((track) => (track.artistId = null));

    try {
      this.favoritesService.deleteArtist(id);
    } catch {}
  }
}

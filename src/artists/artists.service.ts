import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { Artist } from './artist.inerface';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  getAll(): Artist[] {
    return this.artists;
  }

  getById(id: string): Artist {
    const Artist = this.artists.find((Artist) => Artist.id === id);
    if (!Artist) {
      throw new NotFoundException('Artist not found');
    }
    return Artist;
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
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found');
    }
    this.artists.splice(artistIndex, 1);
  }
}

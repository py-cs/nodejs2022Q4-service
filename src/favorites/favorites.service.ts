import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Favorites } from './favorites.inerface';

@Injectable()
export class FavoritesService {
  private favoriteIds: Favorites = { albums: [], artists: [], tracks: [] };
  // private services: {
  //   artists: ArtistsService;
  //   albums: AlbumsService;
  //   tracks: TracksService;
  // };

  constructor(
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {
    // this.services = {
    //   artists: this.artistsService,
    //   albums: this.albumsService,
    //   tracks: this.tracksService,
    // };
  }

  getAll() {
    const artists = this.favoriteIds.artists.map((id) =>
      this.artistsService.getById(id),
    );
    const albums = this.favoriteIds.albums.map((id) =>
      this.albumsService.getById(id),
    );
    const tracks = this.favoriteIds.tracks.map((id) =>
      this.tracksService.getById(id),
    );

    return { artists, albums, tracks };
  }

  addArtist(id: string) {
    const candidate = this.artistsService.getById(id);
    if (!candidate) {
      throw new UnprocessableEntityException('Artist not found');
    }
    this.favoriteIds.artists.push(id);
    return `Artist ${candidate.name} added to favorites`;
  }

  deleteArtist(id: string) {
    if (!this.favoriteIds.artists.includes(id)) {
      throw new NotFoundException('Artist id not found in favorites');
    }
    this.favoriteIds.artists = this.favoriteIds.artists.filter(
      (artistId) => artistId !== id,
    );
  }

  addAlbum(id: string) {
    const candidate = this.albumsService.getById(id);
    if (!candidate) {
      throw new UnprocessableEntityException('Album not found');
    }
    this.favoriteIds.albums.push(id);
    return `Album ${candidate.name} added to favorites`;
  }

  deleteAlbum(id: string) {
    if (!this.favoriteIds.albums.includes(id)) {
      throw new NotFoundException('Album id not found in favorites');
    }
    this.favoriteIds.albums = this.favoriteIds.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  addTrack(id: string) {
    const candidate = this.tracksService.getById(id);
    if (!candidate) {
      throw new UnprocessableEntityException('Track not found');
    }
    this.favoriteIds.tracks.push(id);
    return `Track ${candidate.name} added to favorites`;
  }

  deleteTrack(id: string) {
    if (!this.favoriteIds.tracks.includes(id)) {
      throw new NotFoundException('Track id not found in favorites');
    }
    this.favoriteIds.tracks = this.favoriteIds.tracks.filter(
      (trackId) => trackId !== id,
    );
  }
}

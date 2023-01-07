export class CreateTrackDTO {
  readonly name: string;
  readonly duration: number;
  readonly artistId?: string;
  readonly albumId?: string;
}

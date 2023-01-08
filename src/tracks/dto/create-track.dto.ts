import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTrackDTO {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly duration: number;
  readonly artistId?: string;
  readonly albumId?: string;
}

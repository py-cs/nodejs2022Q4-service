import { IsString } from 'class-validator';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateAlbumDTO {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly year: number;
  readonly artistId?: string;
}

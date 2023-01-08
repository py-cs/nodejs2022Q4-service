import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDTO {
  @IsString()
  readonly name: string;
  @IsBoolean()
  readonly grammy: boolean;
}

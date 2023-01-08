import { IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  readonly oldPassword: string;
  @IsString()
  readonly newPassword: string;
}

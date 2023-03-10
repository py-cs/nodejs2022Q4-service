import { Exclude, Type } from 'class-transformer';

export class User {
  id: string;
  login: string;
  @Exclude({ toPlainOnly: true })
  password: string;
  version: number;
  @Type(() => Number)
  createdAt: number;
  @Type(() => Number)
  updatedAt: number;
  @Exclude({ toPlainOnly: true })
  refreshHash: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

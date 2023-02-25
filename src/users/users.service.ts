import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { PrismaService } from '../database/prisma.service';
import { errors } from '../common/utils/errors';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw errors.notFound('User', id);
    return user;
  }

  async getByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } });
  }

  async create({ login, password }: CreateUserDTO) {
    const passwordHash = await bcrypt.hash(password, 5);

    return this.prisma.user.create({
      data: { login, password: passwordHash },
    });
  }

  async updatePassword(
    id: string,
    { newPassword, oldPassword }: UpdatePasswordDTO,
  ) {
    const user = await this.getById(id);
    if (!user) throw errors.notFound('User', id);

    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrectPassword) {
      throw new ForbiddenException('Incorrect password');
    }

    const newPasswordHash = await bcrypt.hash(
      newPassword,
      +process.env.CRYPT_SALT,
    );

    return this.prisma.user.update({
      where: { id },
      data: {
        password: newPasswordHash,
        version: user.version + 1,
      },
    });
  }

  async updateRefreshHash(
    id: string,
    refreshHash: string | null,
  ): Promise<void> {
    const user = await this.getById(id);
    if (!user) throw errors.notFound('User', id);
    await this.prisma.user.update({
      where: { id: id },
      data: { refreshHash },
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch {
      throw errors.notFound('User', id);
    }
  }
}

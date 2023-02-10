import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { PrismaService } from '../database/prisma.service';
import { plainToClass } from 'class-transformer';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => plainToClass(User, user));
  }

  async getById(id: string) {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return plainToClass(User, user);
  }

  async create(createUserDTO: CreateUserDTO) {
    const user = await this.prismaService.user.create({
      data: createUserDTO,
    });
    return plainToClass(User, user);
  }

  async update(id: string, updatePasswordDTO: UpdatePasswordDTO) {
    const user = await this.getById(id);
    if (user.password !== updatePasswordDTO.oldPassword) {
      throw new ForbiddenException('Incorrect password');
    }
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: {
          password: updatePasswordDTO.newPassword,
          version: user.version + 1,
        },
      });
      return plainToClass(User, updatedUser);
    } catch {
      throw new NotFoundException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaService.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }
}

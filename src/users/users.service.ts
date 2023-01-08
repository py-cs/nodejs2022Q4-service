import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(createUserDTO: CreateUserDTO): Omit<User, 'password'> {
    const id = uuidv4();
    const user = new User({
      ...createUserDTO,
      id,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.users.push(user);
    return user;
  }

  update(id: string, updatePasswordDTO: UpdatePasswordDTO): User {
    const user = this.getById(id);
    console.log(
      `old: ${user.password} verif: ${updatePasswordDTO.oldPassword}`,
    );
    if (user.password !== updatePasswordDTO.oldPassword) {
      throw new ForbiddenException('Incorrect password');
    }
    user.password = updatePasswordDTO.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    console.log(user);
    return new User(user);
  }

  delete(id: string): void {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.users = this.users.filter((user) => user.id !== id);
  }
}

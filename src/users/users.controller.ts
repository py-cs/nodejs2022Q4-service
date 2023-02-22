import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UsersService } from './users.service';
import { UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { TransformPlainToInstance } from 'class-transformer';
import { User } from './user.model';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @TransformPlainToInstance(User)
  async getAll() {
    return await this.usersService.getAll();
  }

  @Get(':id')
  @TransformPlainToInstance(User)
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.getById(id);
  }

  @Post()
  @TransformPlainToInstance(User)
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.usersService.create(createUserDTO);
  }

  @Put(':id')
  @Header('Cache-Control', 'no-cache')
  @TransformPlainToInstance(User)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ) {
    return await this.usersService.updatePassword(id, updatePasswordDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.delete(id);
  }
}

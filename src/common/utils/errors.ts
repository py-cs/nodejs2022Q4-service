import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';

export const errors = {
  notFound: (entityName: string, id: string) =>
    new NotFoundException(`${entityName} with id ${id} not found`),

  unableToAddToFavorites: (entityName: string, id: string) =>
    new UnprocessableEntityException(
      `${entityName} with id ${id} can not added to favorites`,
    ),

  userExists: (login: string) =>
    new ConflictException(`User with login ${login} already exists`),

  invalidCredentials: () => new ForbiddenException('Invalid login/password'),

  invalidToken: () => new ForbiddenException('Token expired or invalid'),

  internal: () => new InternalServerErrorException('Internal server error'),
};

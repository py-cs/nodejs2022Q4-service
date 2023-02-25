import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

export const errors = {
  notFound: (entityName: string, id: string) =>
    new NotFoundException(`${entityName} with id ${id} not found`),

  unableToAddToFavorites: (entityName: string, id: string) =>
    new UnprocessableEntityException(
      `${entityName} with id ${id} can not added to favorites`,
    ),

  internal: () => new InternalServerErrorException('Internal error'),
};

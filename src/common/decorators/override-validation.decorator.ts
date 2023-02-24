import {
  createParamDecorator,
  ExecutionContext,
  ValidationPipe,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

export const RawBody = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): any => {
    return ctx.switchToHttp().getRequest().body;
  },
);

//TODO: Remove after cross-check
export const OverrideBodyValidation = () =>
  RawBody(
    new ValidationPipe({
      validateCustomDecorators: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNAUTHORIZED,
    }),
  );

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { errors } from '../utils/errors';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
  constructor() {
    process.on('uncaughtException', (error) => {
      Logger.error(error);
    });
    process.on('unhandledRejection', () => {
      throw errors.internal();
    });
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message;

    Logger.error(exception);

    response.status(statusCode).json({
      error: exception.name,
      message,
    });
  }
}

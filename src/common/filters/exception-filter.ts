import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { INTERNAL_ERROR_MESSAGE } from '../constants';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
  constructor() {
    ['uncaughtException', 'unhandledRejection'].forEach((event) =>
      process.on(event, () => {
        Logger.error(event);
      }),
    );
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof Error ? exception.message : INTERNAL_ERROR_MESSAGE;

    const logMessage = `[Error] - ${statusCode} - ${message}`; // TODO: message format

    Logger.error(logMessage);

    response.status(statusCode).json({
      statusCode,
      message,
      path: request.url,
    });
  }
}

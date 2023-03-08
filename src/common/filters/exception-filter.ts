import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { errors } from '../utils/errors';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor() {
    process.on('uncaughtException', (error) => {
      Logger.error(`[uncaughtException] ${error.message}`);
    });
    process.on('unhandledRejection', (error) => {
      Logger.error(`[unhandledRejection] ${JSON.stringify(error)}`);
    });
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let responseData: object | string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      responseData = exception.getResponse();
      const message =
        typeof responseData === 'object'
          ? responseData['message']
          : JSON.stringify(responseData);

      const logMessage = `[${status}] ${message}`;
      Logger.error(logMessage);
    } else {
      const message =
        exception instanceof Error
          ? exception.message
          : JSON.stringify(exception);
      Logger.error(`[---] ${message}`);

      const internal = errors.internal();
      status = internal.getStatus();
      responseData = internal.getResponse();
    }

    response.status(status).json(responseData);

    const responseLogMessage = `<-- [${
      this.constructor.name
    }] [${status}] ${JSON.stringify(responseData)}`;

    if (status < 500) {
      Logger.warn(responseLogMessage);
    } else {
      Logger.error(responseLogMessage);
    }
  }
}

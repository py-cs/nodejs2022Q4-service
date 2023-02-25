import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { hideCredentials } from '../utils/hideCredentials';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, query, params, body } = request;

    const requestMessage = `--> ${method} ${url} query: ${JSON.stringify(
      query || {},
    )} params: ${JSON.stringify(params || {})} body: ${JSON.stringify(
      hideCredentials(body || {}),
    )}`;

    Logger.log(requestMessage);

    return next.handle().pipe(
      tap(async (response: Response) => {
        const module = context.getClass().name;
        const code = context.switchToHttp().getResponse().statusCode;

        const responseMessage = `<-- [${module}] [${code}] ${JSON.stringify(
          hideCredentials(response || {}),
        )}`;

        Logger.log(responseMessage);
      }),
    );
  }
}

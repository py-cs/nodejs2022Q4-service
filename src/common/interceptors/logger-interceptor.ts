import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { url, query, body } = request;

    const message = `[${context.getClass().name}] - ${url} - ${JSON.stringify(
      query,
    )} - ${JSON.stringify(body)}}`;

    return next.handle().pipe(tap(() => Logger.log(message)));
  }
}

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

    // TODO: message format
    return next.handle().pipe(
      tap(async (response) => {
        const message = `----
Incoming request:
[${context.getClass().name}]
URL: ${url}
Query params: ${JSON.stringify(query)}
Body: ${JSON.stringify(body)}
Response: ${context.switchToHttp().getResponse().statusCode} ${JSON.stringify(
          response,
        )}
`;
        Logger.log(message);
      }),
    );
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

const PRIVATE_FIELDS = ['password', 'accessToken', 'refreshToken'];

function maskPrivateFields(
  data: Record<string, any> | Array<Record<string, any>>,
) {
  if (Array.isArray(data))
    return data.map((record) => maskPrivateFields(record));
  const safeData = { ...data };
  PRIVATE_FIELDS.forEach((field) => {
    if (data.hasOwnProperty(field)) {
      safeData[field] = '******';
    }
  });
  return safeData;
}

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { url, query, body } = request;

    // TODO: message format
    return next.handle().pipe(
      tap(async (response) => {
        const message = `----
Incoming request:
[${context.getClass().name}]
URL: ${url}
Query params: ${JSON.stringify(query)}
Body: ${JSON.stringify(maskPrivateFields(body))}
Response: ${context.switchToHttp().getResponse().statusCode} ${JSON.stringify(
          maskPrivateFields(response),
        )}
`;
        Logger.log(message);
      }),
    );
  }
}

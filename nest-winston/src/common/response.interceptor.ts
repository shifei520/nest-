import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Logger } from 'src/winston/winston.provider';
import { map } from 'rxjs';
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  @Inject(Logger)
  private logger: Logger;

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.getArgByIndex(1).req;

    return next.handle().pipe(
      map((data) => {
        const logFormat = `
    ##############################################################
  ####################
    RequestOriginal: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    ResponseData: ${JSON.stringify(data)}
    ##############################################################
  ####################
    `;
        this.logger.info(logFormat, 'Response ResponseInterceptor');
        return data;
      }),
    );
  }
}

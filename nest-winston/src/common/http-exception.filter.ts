import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { stat } from 'fs';
import { Logger } from 'src/winston/winston.provider';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  @Inject(Logger)
  private logger: Logger;

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const logFormat = `
    ##############################################################
  ####################
    RequestOriginal: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    StatusCode: ${status}
    Response: ${
      exception.toString() +
      `(${exceptionResponse?.message || exception.message})`
    }
    ##############################################################
  ####################
    `;
    this.logger.error(logFormat, 'HttpException Filter');

    res.status(status).json({
      code: status,
      message: exceptionResponse?.message || exception.message,
    });
  }
}

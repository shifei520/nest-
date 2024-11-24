import { Injectable } from '@nestjs/common';
import 'winston-daily-rotate-file';
import {
  Logger as WinstonLogger,
  createLogger,
  format,
  transports,
} from 'winston';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';

@Injectable()
export class Logger {
  private logger: WinstonLogger;
  constructor() {
    this.logger = createLogger({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, timestamp }) => {
              const appStr = chalk.green(`[Nest]`);
              const contextStr = chalk.yellow(`[${context}]`);

              return `${appStr} ${timestamp}  ${level} ${contextStr} ${message}`;
            }),
          ),
        }),
        new transports.DailyRotateFile({
          dirname: process.cwd() + '/logs',
          filename: 'application-%DATE%.info.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '7d',
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.json(),
          ),
          level: 'info',
        }),
        new transports.DailyRotateFile({
          dirname: process.cwd() + '/logs',
          filename: 'application-%DATE%.error.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.json(),
          ),
          level: 'error',
        }),
        // 将日志发送到远程服务器
        // new transports.Http({
        //   host: 'localhost',
        //   path: '/logs',
        // }),
      ],
    });
  }
  log(message: string, context?: string): void {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('info', message, { context, timestamp });
  }
  info(message: string, context?: string): void {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.logger.info(message, { context, timestamp });
  }
  error(message: string, context?: string) {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.logger.error(message, { context, timestamp });
  }
  warn(message: string, context?: string) {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.logger.warn(message, { context, timestamp });
  }
}

import { Module } from '@nestjs/common';
import { Logger } from './winston.provider';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class WinstonModule {}

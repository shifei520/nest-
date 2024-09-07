import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('USER_SERVICE')
  private clientProxy: ClientProxy;

  @Get('sum')
  sum(@Query('str') str: string): Observable<number> {
    const arr = str.split(',').map(Number);
    return this.clientProxy.send<number>('sum', arr);
  }

  @Get('log')
  log(@Query('str') str: string): Observable<any> {
    return this.clientProxy.emit('log', str);
  }
}

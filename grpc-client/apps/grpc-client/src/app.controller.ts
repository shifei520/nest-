import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';

interface FindById {
  id: number;
}
interface Book {
  id: number;
  name: string;
  desc: string;
}
interface BookService {
  findBook(param: FindById): Book;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('GRPC_CLIENT')
  private grpcClient: ClientGrpc;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('find/:id')
  find(@Param('id') id: number) {
    return (this.grpcClient.getService('BookService') as BookService).findBook({
      id,
    });
  }
}

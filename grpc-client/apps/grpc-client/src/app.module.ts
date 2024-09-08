import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import path from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GRPC_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:8888',
          package: 'book',
          protoPath: path.join(__dirname, 'book/book.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

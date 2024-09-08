import { NestFactory } from '@nestjs/core';
import { GrpcServerModule } from './grpc-server.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(
    GrpcServerModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:8888',
        package: 'book',
        protoPath: path.join(__dirname, 'book/book.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();

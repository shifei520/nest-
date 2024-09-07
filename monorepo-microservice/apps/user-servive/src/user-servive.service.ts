import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServiveService {
  getHello(): string {
    return 'Hello World!';
  }
}

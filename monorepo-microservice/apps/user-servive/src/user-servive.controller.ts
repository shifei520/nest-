import { Controller, Get } from '@nestjs/common';
import { UserServiveService } from './user-servive.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserServiveController {
  constructor(private readonly userServiveService: UserServiveService) {}

  @MessagePattern('sum')
  sum(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0);
  }

  @EventPattern('log')
  log(data: any) {
    console.log(data);
  }
}

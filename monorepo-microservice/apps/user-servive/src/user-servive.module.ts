import { Module } from '@nestjs/common';
import { UserServiveController } from './user-servive.controller';
import { UserServiveService } from './user-servive.service';

@Module({
  imports: [],
  controllers: [UserServiveController],
  providers: [UserServiveService],
})
export class UserServiveModule {}

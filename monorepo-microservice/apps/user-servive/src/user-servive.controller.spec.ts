import { Test, TestingModule } from '@nestjs/testing';
import { UserServiveController } from './user-servive.controller';
import { UserServiveService } from './user-servive.service';

describe('UserServiveController', () => {
  let userServiveController: UserServiveController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserServiveController],
      providers: [UserServiveService],
    }).compile();

    userServiveController = app.get<UserServiveController>(UserServiveController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userServiveController.getHello()).toBe('Hello World!');
    });
  });
});

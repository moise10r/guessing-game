import { Test, TestingModule } from '@nestjs/testing';
import { GuessManagerController } from './guess-manager.controller';
import { GuessManagerService } from './guess-manager.service';

describe('GuessManagerController', () => {
  let guessManagerController: GuessManagerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GuessManagerController],
      providers: [GuessManagerService],
    }).compile();

    guessManagerController = app.get<GuessManagerController>(
      GuessManagerController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(guessManagerController.getHello()).toBe('Hello World!');
    });
  });
});

import { Controller, Get } from '@nestjs/common';
import { GuessManagerService } from './guess-manager.service';

@Controller()
export class GuessManagerController {
  constructor(private readonly guessManagerService: GuessManagerService) {}

  @Get()
  getHello(): string {
    return this.guessManagerService.getHello();
  }
}

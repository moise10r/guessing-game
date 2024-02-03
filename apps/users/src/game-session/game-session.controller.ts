import { Controller, Post } from '@nestjs/common';
import { GameSessionService } from './game-session.service';

@Controller('game-session')
export class GameSessionController {
  constructor(private readonly gameSessionService: GameSessionService) {}

  @Post()
  async createSession(): Promise<string> {
    return this.gameSessionService.createSession();
  }
}
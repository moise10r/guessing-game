import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { PlayerDto } from '@app/common/dto/player.dto';
import { CreateGameSessionDto } from '@app/common/dto/create-game-session.dto';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('new-player')
  async createPlayer(@Body() playerPayload: PlayerDto) {
    return this.apiService.createPlayer(playerPayload);
  }

  @Post('start-game')
  async startGame(@Body() gameSessionPayload: CreateGameSessionDto) {
    return this.apiService.startGameSession(gameSessionPayload);
  }

  @Get()
  async getPlayer() {
    return 'Players';
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { PlayerDto } from '@app/common/dto/player.dto';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post()
  async createPlayer(@Body() player: PlayerDto) {
    return this.apiService.createPlayer(player);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/createPlayer.dto';

@Controller('players')
export class PlayersController {
  constructor(protected readonly playersService: PlayersService) {}

  @Post('new')
  async create(@Body() playerPayload: CreatePlayerDto) {
    return this.playersService.create(playerPayload);
  }
}

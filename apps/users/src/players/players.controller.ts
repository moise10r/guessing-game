import { Body, Controller, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from '@app/common/dto/player.dto';

@Controller('players')
export class PlayersController {
  constructor(protected readonly playersService: PlayersService) {}

  @Post('new')
  async create(@Body() playerPayload: PlayerDto) {
    return this.playersService.create(playerPayload);
  }
}

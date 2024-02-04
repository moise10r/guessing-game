import { Controller } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from '@app/common/dto/player.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CREATE_PLAYER } from '@app/common/constants/messages';
import { RmqService } from '@app/common';

@Controller('players')
export class PlayersController {
  constructor(
    protected readonly playersService: PlayersService,
    private readonly rmqService: RmqService,
  ) {}
  @MessagePattern(CREATE_PLAYER)
  async createdPlayer(
    @Payload() playerPayload: PlayerDto,
    @Ctx() context: RmqContext,
  ) {
    const createdPlayer = await this.playersService.create({
      ...playerPayload,
    });
    if (createdPlayer) {
      this.rmqService.acknowledgeMessage(context);
    }
    return createdPlayer;
  }

  async create() {}
}

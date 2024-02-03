import { Controller } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from '@app/common/dto/player.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('players')
export class PlayersController {
  constructor(protected readonly playersService: PlayersService) {}

  @MessagePattern('create_player')
  async create(
    @Payload() playerPayload: PlayerDto,
    @Ctx() context: RmqContext,
  ) {
    console.log('playerPayload', playerPayload);

    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      const createdPlayer = await this.playersService.create(playerPayload);
      if (createdPlayer) {
        channel.ack(originalMsg);
        return createdPlayer;
      }
    } catch (error) {
      throw error;
    }
  }
}

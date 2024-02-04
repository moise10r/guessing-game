import { Controller } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from '@app/common/dto/player.dto';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('players')
export class PlayersController {
  constructor(protected readonly playersService: PlayersService) {}

  // @MessagePattern('create_players')
  // async create(
  //   @Payload() playerPayload: PlayerDto,
  //   @Ctx() context: RmqContext,
  // ) {
  //   console.log('playerPayload', playerPayload);

  //   try {
  //     const channel = context.getChannelRef();
  //     const originalMsg = context.getMessage();
  //     if (createdPlayer) {
  //       channel.ack(originalMsg);
  //       return createdPlayer;
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @EventPattern('create_player')
  async createdPlayer(
    @Payload() playerPayload: PlayerDto,
    @Ctx() context: RmqContext,
  ) {
    console.log('create_player', playerPayload);
    const createdPlayer = await this.playersService.create(playerPayload);
    console.log('createdPlayer', createdPlayer);
  }

  async create() {}
}

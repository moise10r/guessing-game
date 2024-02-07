import { Controller } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from '@app/common/dto/player.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PERSIST_PLAYER, START_GAME } from '@app/common/constants/messages';
import { RmqService } from '@app/common';
import { GameRoundService } from '../game-round/game-round.service';
import { IGameRound } from '../game-round/interfaces/game-round.interface';

@Controller('players')
export class PlayersController {
  constructor(
    protected readonly playersService: PlayersService,
    protected readonly gameRoundService: GameRoundService,
    private readonly rmqService: RmqService,
  ) {}
  @MessagePattern(PERSIST_PLAYER)
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

  @MessagePattern(START_GAME)
  async startGame(
    @Payload() gameRoundPayload: IGameRound,
    @Ctx() context: RmqContext,
  ) {
    console.log('gameRoundPayload', gameRoundPayload);

    const createdGameRound =
      await this.gameRoundService.createGameRound(gameRoundPayload);
    // if (createdGameRound) {
    this.rmqService.acknowledgeMessage(context);
    // }
    return createdGameRound;
  }
}

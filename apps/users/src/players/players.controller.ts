import { Controller } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerDto } from '@app/common/dto/player.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CREATE_PLAYER, START_GAME } from '@app/common/constants/messages';
import { RmqService } from '@app/common';
import { GameSessionService } from '../game-session/game-session.service';
import { CreateGameSessionDto } from '@app/common/dto/create-game-session.dto';

@Controller('players')
export class PlayersController {
  constructor(
    protected readonly playersService: PlayersService,
    protected readonly gameSessionService: GameSessionService,
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

  @MessagePattern(START_GAME)
  async startGame(
    @Payload() gameSessionPayload: CreateGameSessionDto,
    @Ctx() context: RmqContext,
  ) {
    console.log('gameSessionPayload', gameSessionPayload);

    const createdGameSession =
      await this.gameSessionService.createGameSession(gameSessionPayload);
    // if (createdGameSession) {
    this.rmqService.acknowledgeMessage(context);
    // }
    return createdGameSession;
  }
}

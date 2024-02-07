import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { WebsocketGatewayService } from './websocket-gateway.service';
import { WebSocketEvents } from './enums/event.enums';
import { IPlayer } from '@app/common';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Message } from './interfaces/message.interface';
import { RankPlayer } from '@app/common/interfaces/rank-player.interface';

export const joinedPlayersMap: Map<string, IPlayer> = new Map();
export const rankPlayersMap: Map<string, RankPlayer> = new Map();

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGatewayGateway {
  private readonly logger = new Logger(WebsocketGatewayGateway.name);
  constructor(
    private readonly websocketGatewayService: WebsocketGatewayService,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log('connection', socket.id);
    });
  }

  @SubscribeMessage(WebSocketEvents.PLAYER_JOIN)
  PlayerJoin(
    @MessageBody() payload: IPlayer,
    @ConnectedSocket() client: Socket,
  ) {
    this.initializeBootMessages(client);
    joinedPlayersMap.set(payload.name, payload);
    const players = Array.from(joinedPlayersMap.values());
    console.log('players', players);

    this.server.emit(WebSocketEvents.PLAYER_ADDED, players);
  }

  @SubscribeMessage(WebSocketEvents.STARTS_ROUND)
  startRound(
    @MessageBody() payload: IPlayer,
    @ConnectedSocket() client: Socket,
  ) {
    // Clean the previous data for being set with the new player data
    joinedPlayersMap.clear();
    joinedPlayersMap.set(payload.name, payload);
    console.log('payload', payload);

    client.broadcast.emit(WebSocketEvents.STARTS_ROUND, payload);
    // this.server.emit(WebSocketEvents.ROUND_STARTED, payload);
  }
  @SubscribeMessage(WebSocketEvents.ROUND_STARTED)
  roundStarted(
    @MessageBody() payload: IPlayer,
    // @ConnectedSocket() client: Socket,
  ) {
    joinedPlayersMap.set(payload.name, payload);
    const players = Array.from(joinedPlayersMap.values());
    console.log('players who started the round', players);
    this.server.emit(WebSocketEvents.PLAYER_ADDED, players);
  }

  @SubscribeMessage(WebSocketEvents.ROUND_ENDED)
  roundEnded() {
    this.server.emit(WebSocketEvents.ROUND_ENDED);
  }

  @SubscribeMessage(WebSocketEvents.SEND_SCORE)
  sendScore(@MessageBody() payload: RankPlayer) {
    rankPlayersMap.set(payload.name, payload);
    const players = Array.from(rankPlayersMap.values());
    console.log('SEND_SCORE players', players);
    this.server.emit(WebSocketEvents.SEND_SCORE, players);
  }

  @SubscribeMessage(WebSocketEvents.CHAT)
  sendMessages(
    @MessageBody() payload: Message,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit(WebSocketEvents.CHAT, payload);
    return payload;
  }

  initializeBootMessages(client: Socket) {
    const bootMessages = [
      {
        name: 'CPU 1',
        message: 'hi guys',
        delay: 1500,
      },
      {
        name: 'CPU 2',
        message: 'hi men',
        delay: 4000,
      },
      {
        name: 'CPU 3',
        message: 'I could play this game for hours!',
        delay: 7000,
      },
    ];

    bootMessages.forEach((message) => {
      setTimeout(() => {
        client.emit(WebSocketEvents.CHAT, {
          name: message.name,
          message: message.message,
        });
      }, message.delay);
    });
  }
}

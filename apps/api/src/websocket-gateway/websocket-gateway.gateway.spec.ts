import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketGatewayGateway } from './websocket-gateway.gateway';
import { WebsocketGatewayService } from './websocket-gateway.service';

describe('WebsocketGatewayGateway', () => {
  let gateway: WebsocketGatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketGatewayGateway, WebsocketGatewayService],
    }).compile();

    gateway = module.get<WebsocketGatewayGateway>(WebsocketGatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

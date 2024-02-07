import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketGatewayService } from './websocket-gateway.service';

describe('WebsocketGatewayService', () => {
  let service: WebsocketGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketGatewayService],
    }).compile();

    service = module.get<WebsocketGatewayService>(WebsocketGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { WebsocketGatewayModule } from './websocket-gateway/websocket-gateway.module';

@Module({
  imports: [WebsocketGatewayModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

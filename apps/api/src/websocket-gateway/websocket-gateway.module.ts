import { Module } from '@nestjs/common';
import { WebsocketGatewayService } from './websocket-gateway.service';
import { WebsocketGatewayGateway } from './websocket-gateway.gateway';
import { LoggerModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { USERS_SERVICE } from '@app/common/constants';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
      }),
      envFilePath: './apps/api/.env',
    }),
    RmqModule.register({
      name: USERS_SERVICE,
    }),
  ],
  providers: [WebsocketGatewayGateway, WebsocketGatewayService],
})
export class WebsocketGatewayModule {}

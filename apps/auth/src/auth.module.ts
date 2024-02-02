import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [PlayersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

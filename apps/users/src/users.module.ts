import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [PlayersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

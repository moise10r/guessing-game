import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
// import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @EventPattern('persist_player')
  // async createdPlayer(@Payload() player: any, @Ctx() context: RmqContext) {
  //   console.log('persist_player', player);
  //   this.usersService.getHello(player);
  // }

  @Get()
  async getUsers() {
    return 'USERS';
  }
}

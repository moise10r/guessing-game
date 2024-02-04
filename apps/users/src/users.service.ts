import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  getHello(data: any): void {
    this.logger.log('created user', data);
  }
}

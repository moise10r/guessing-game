import { Injectable } from '@nestjs/common';

@Injectable()
export class GuessManagerService {
  getHello(): string {
    return 'Hello World!';
  }
}

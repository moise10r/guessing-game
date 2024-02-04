import { Test, TestingModule } from '@nestjs/testing';
import { JoinedPlayersService } from './joined-player.service';

describe('JoinedPlayerService', () => {
  let service: JoinedPlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinedPlayersService],
    }).compile();

    service = module.get<JoinedPlayersService>(JoinedPlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

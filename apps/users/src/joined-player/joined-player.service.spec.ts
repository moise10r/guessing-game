import { Test, TestingModule } from '@nestjs/testing';
import { JoinedPlayerService } from './joined-player.service';

describe('JoinedPlayerService', () => {
  let service: JoinedPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinedPlayerService],
    }).compile();

    service = module.get<JoinedPlayerService>(JoinedPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

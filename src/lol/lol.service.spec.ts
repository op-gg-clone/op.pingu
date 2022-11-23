import { Test, TestingModule } from '@nestjs/testing';
import { LolService } from './lol.service';

describe('LolService', () => {
  let service: LolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LolService],
    }).compile();

    service = module.get<LolService>(LolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

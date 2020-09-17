import { Test, TestingModule } from '@nestjs/testing';
import { PotterApiService } from './potter-api.service';

describe('PotterApiService', () => {
  let service: PotterApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PotterApiService],
    }).compile();

    service = module.get<PotterApiService>(PotterApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

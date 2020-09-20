import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CrosscuttingResultHandler } from 'src/api/4 - infra/crosscutting-result-handler/crosscutting-result-handler';
import { BaseService } from '../base-service/base.service';
import { PotterApiService } from './potter-api.service';

describe('PotterApiService', () => {
  let potterApiService: PotterApiService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({ timeout: 5000 }),
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      providers: [CrosscuttingResultHandler, BaseService, PotterApiService],
    }).compile();

    potterApiService = testingModule.get<PotterApiService>(PotterApiService);
  });

  it('Verify if its defined', () => {
    expect(potterApiService).toBeDefined();
  });

  it('Verify if path to be passed to Http Module contains House Id and Api Key', () => {
    const houseId = '5a05e2b252f721a3cf2ea33f';
    const apiKey =
      '$2a$10$.FD0mrohlrgmE0eT8Ft67uLUk6OOJAEI1XM7Ug1kBihnj2pksGDYO';
  });
});

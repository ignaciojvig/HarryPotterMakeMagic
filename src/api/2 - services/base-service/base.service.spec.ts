import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CrosscuttingResultHandler } from 'src/api/4 - infra/crosscutting-result-handler/crosscutting-result-handler';
import { ICrosscuttingResult } from 'src/api/4 - infra/crosscutting-result-handler/icrosscutting-result';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let baseService: BaseService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [CrosscuttingResultHandler, BaseService],
    }).compile();

    baseService = testingModule.get<BaseService>(BaseService);
  });

  it('Verify if its defined', () => {
    expect(baseService).toBeDefined();
  });

  it('Handle Crosscutting Result with failure', () => {
    const mockedCrosscuttingResult = {
      result: false,
      resultingData: new UnprocessableEntityException(),
    } as ICrosscuttingResult;

    expect(() => {
      baseService.handleCommandResponse(mockedCrosscuttingResult);
    }).toThrow(UnprocessableEntityException);
  });

  it('Handle Crosscutting Result with success', () => {
    const mockedCrosscuttingResult = {
      result: true,
      resultingData: 'Success',
    } as ICrosscuttingResult;

    expect(
      baseService.handleCommandResponse(mockedCrosscuttingResult),
    ).toBeTruthy();
  });
});

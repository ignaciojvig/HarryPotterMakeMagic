import { Injectable } from '@nestjs/common';
import { CrosscuttingResultHandler } from 'src/api/4 - infra/crosscutting-result-handler/crosscutting-result-handler';
import { ICrosscuttingResult } from 'src/api/4 - infra/crosscutting-result-handler/icrosscutting-result';

@Injectable()
export class BaseService {
  constructor(
    private injectedCrosscuttingHandler?: CrosscuttingResultHandler,
  ) {}

  handleCommandResponse(crosscuttingResult: ICrosscuttingResult) {
    if (!crosscuttingResult.result) {
      throw crosscuttingResult.resultingData;
    }

    return crosscuttingResult.resultingData;
  }
}

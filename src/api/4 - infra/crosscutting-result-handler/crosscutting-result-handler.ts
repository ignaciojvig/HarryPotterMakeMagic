import { HttpException, Injectable } from '@nestjs/common';
import { ICrosscuttingResult } from './icrosscutting-result';

@Injectable()
export class CrosscuttingResultHandler {
  private crosscuttingResult: ICrosscuttingResult = {} as ICrosscuttingResult;

  setCrosscuttingResultAsSuccessful(resultingData: any): void {
    this.crosscuttingResult.resultingData = resultingData;
    this.crosscuttingResult.result = true;
  }

  setCrosscuttingResultAsFailed(resultingData: any | HttpException): void {
    this.crosscuttingResult.resultingData = resultingData;
    this.crosscuttingResult.result = false;
  }

  getCrosscuttingResult(): string | any {
    return this.crosscuttingResult;
  }
}

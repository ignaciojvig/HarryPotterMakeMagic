import { HttpException } from '@nestjs/common';

export interface ICrosscuttingResult {
  resultingData: any | HttpException;
  result: boolean;
}

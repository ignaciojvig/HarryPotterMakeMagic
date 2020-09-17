import { HttpException } from '@nestjs/common';

export interface ICommandResult {
  resultingData: any | HttpException;
  operationResult: boolean;
}

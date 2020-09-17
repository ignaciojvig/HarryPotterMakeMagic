import { HttpException, Injectable } from '@nestjs/common';
import { ICommandResult } from './icommand-result';

@Injectable()
export class CommandHandler {
  private commandResult: ICommandResult = {} as ICommandResult;

  setCommandAsSuccessful(resultingData: any): void {
    this.commandResult.resultingData = resultingData;
    this.commandResult.operationResult = true;
  }

  setCommandAsFailed(resultingData: any | HttpException): void {
    this.commandResult.resultingData = resultingData;
    this.commandResult.operationResult = false;
  }

  getCommandResult(): string | any {
    return this.commandResult;
  }
}

import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ICommandResult } from 'src/api/4 - infra/command-handler/icommand-result';

@Injectable()
export class BaseService {
  handleCommandResponse(commandResult: ICommandResult) {
    if (!commandResult.operationResult) {
      throw commandResult.resultingData;
    }

    return commandResult.resultingData;
  }
}

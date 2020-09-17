import {
  HttpService,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from 'src/api/4 - infra/command-handler/command-handler';
import { ICommandResult } from 'src/api/4 - infra/command-handler/icommand-result';

@Injectable()
export class PotterApiService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private command: CommandHandler,
  ) {}

  async validateHouseId(
    houseId: string,
    potterApiKey: string,
  ): Promise<ICommandResult> {
    return await this.requestToPotterApi(houseId, potterApiKey);
  }

  private async requestToPotterApi(
    houseId: string,
    potterApiKey: string,
  ): Promise<ICommandResult> {
    const isValid = await this.httpService
      .get<any[]>(this.getPotterAPIFullPath(houseId, potterApiKey))
      .toPromise()
      .catch(err => err);

    switch (isValid.status || isValid.response.status) {
      case 200:
        if (isValid.data.length === 0) {
          this.command.setCommandAsFailed(
            new UnprocessableEntityException(
              'The given Id on the property House is not related to a House as specified by PotterAPI Documentation. Verify the value from it and try again',
            ),
          );
        } else {
          this.command.setCommandAsSuccessful(true);
        }
        break;

      case 401:
        this.command.setCommandAsFailed(
          new UnprocessableEntityException(
            'A problem occured while trying to authenticate to PotterAPI. The API Key might be wrong',
          ),
        );
        break;

      default:
        this.command.setCommandAsFailed(
          new UnprocessableEntityException(
            "The server couldn't access PotterAPI in order to perform validations. We are terribly sorry. Try again later",
          ),
        );
        break;
    }

    return this.command.getCommandResult();
  }

  private getPotterAPIFullPath(houseId: string, potterApiKey: string): string {
    return `${this.configService.get<string>(
      'POTTERAPI_HOUSE_VALIDATION_URL',
    )}/${houseId}?key=${potterApiKey}`;
  }
}

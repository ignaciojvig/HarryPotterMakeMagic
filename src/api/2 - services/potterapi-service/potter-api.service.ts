import {
  HttpService,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CrosscuttingResultHandler } from 'src/api/4 - infra/crosscutting-result-handler/crosscutting-result-handler';
import { ICrosscuttingResult } from 'src/api/4 - infra/crosscutting-result-handler/icrosscutting-result';
import { BaseService } from '../base-service/base.service';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class PotterApiService extends BaseService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private crosscuttingHandler: CrosscuttingResultHandler,
  ) {
    super(crosscuttingHandler);
  }

  async validateHouseId(
    houseId: string,
    potterApiKey: string,
  ): Promise<ICrosscuttingResult> {
    return await this.requestToPotterApi(houseId, potterApiKey);
  }

  private async requestToPotterApi(
    houseId: string,
    potterApiKey: string,
  ): Promise<ICrosscuttingResult> {
    const retryAttempts = 0;

    const isValid = await this.httpService
      .get<any[]>(this.getPotterAPIFullPath(houseId, potterApiKey))
      .pipe(
        retry(3),
        catchError(err => {
          throw err;
        }),
      )
      .toPromise()
      .catch(err => err);

    switch (isValid.status || isValid.response.status) {
      case 200:
        if (
          isValid.data.name === 'CastError' ||
          (Array.isArray(isValid.data) && isValid.data.length === 0)
        ) {
          this.crosscuttingHandler.setCrosscuttingResultAsFailed(
            new UnprocessableEntityException(
              'The given Id on the property House is not related to a House as specified by PotterAPI Documentation. Verify the value from it and try again',
            ),
          );
        } else {
          this.crosscuttingHandler.setCrosscuttingResultAsSuccessful(true);
        }
        break;

      case 401:
        this.crosscuttingHandler.setCrosscuttingResultAsFailed(
          new UnprocessableEntityException(
            'A problem occured while trying to authenticate to PotterAPI. The API Key might be wrong',
          ),
        );
        break;

      default:
        this.crosscuttingHandler.setCrosscuttingResultAsFailed(
          new UnprocessableEntityException(
            "The server couldn't access PotterAPI in order to perform validations. We are terribly sorry. Try again later",
          ),
        );
        break;
    }

    return this.crosscuttingHandler.getCrosscuttingResult();
  }

  getPotterAPIFullPath(houseId: string, potterApiKey: string): string {
    return `${this.configService.get<string>(
      'POTTERAPI_HOUSE_VALIDATION_URL',
    )}/${houseId}?key=${potterApiKey}`;
  }
}

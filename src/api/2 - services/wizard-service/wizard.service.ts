import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WizardEntity } from 'src/api/3 - domain/Wizard/wizard.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base-service/base.service';
import { PotterApiService } from '../potterapi-service/potter-api.service';

@Injectable()
export class WizardService extends BaseService {
  constructor(
    @InjectRepository(WizardEntity)
    private wizardRepository: Repository<WizardEntity>,
    private potterApiService: PotterApiService,
  ) {
    super();
  }

  async getAllWizards(): Promise<WizardEntity[]> {
    return await this.wizardRepository.find();
  }

  async getAllWizardsFilteringByHouse(
    houseId: string,
  ): Promise<WizardEntity[]> {
    if (houseId.length !== 24) {
      throw new UnprocessableEntityException(
        'The House Id length must be equal to 24 characters',
      );
    }

    return await this.wizardRepository.find({ where: { house: houseId } });
  }

  async getWizardById(id: number): Promise<WizardEntity> {
    const wizardExists = await this.wizardRepository.findOne({
      where: { id: id },
    });

    if (!wizardExists) {
      throw new BadRequestException(
        `An Wizard with the given Id does not exist!`,
      );
    }

    return wizardExists;
  }

  async createNewWizard(
    newWizard: WizardEntity,
    potterApiKey: string,
  ): Promise<WizardEntity> {
    const validateHouse = await this.potterApiService.validateHouseId(
      newWizard.house,
      potterApiKey,
    );

    this.handleCommandResponse(validateHouse);

    return await this.wizardRepository.save(newWizard);
  }

  async updateWizard(
    wizardToBeUpdated: WizardEntity,
    potterApiKey: string,
  ): Promise<WizardEntity> {
    const wizardExists = await this.wizardRepository.findOne({
      where: { id: wizardToBeUpdated.id },
    });

    if (!wizardExists) {
      throw new BadRequestException(
        `An Wizard with the given Id does not exist!`,
      );
    }

    const validateHouse = await this.potterApiService.validateHouseId(
      wizardToBeUpdated.house,
      potterApiKey,
    );

    this.handleCommandResponse(validateHouse);

    return await this.wizardRepository.save(wizardToBeUpdated);
  }

  async deleteWizard(id: number): Promise<void> {
    const wizardExists = await this.wizardRepository.findOne({
      where: { id: id },
    });

    if (!wizardExists) {
      throw new BadRequestException(
        `An Wizard with the given Id does not exist!`,
      );
    }

    await this.wizardRepository.delete(id);
  }
}

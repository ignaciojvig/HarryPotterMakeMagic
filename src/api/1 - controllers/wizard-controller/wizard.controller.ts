import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WizardService } from 'src/api/2 - services/wizard-service/wizard.service';
import { WizardEntity } from 'src/api/3 - domain/Wizard/wizard.entity';

@Controller('wizard')
export class WizardController {
  constructor(private wizardService: WizardService) {}

  @Get()
  async getAllWizards(): Promise<WizardEntity[]> {
    return await this.wizardService.getAllWizards();
  }

  @Get('by-house')
  async getAllWizardsFilteringByHouse(
    @Query('house') houseId: string,
  ): Promise<WizardEntity[]> {
    return await this.wizardService.getAllWizardsFilteringByHouse(houseId);
  }

  @Get(':id')
  async getWizardById(@Param('id') id: number): Promise<WizardEntity> {
    return await this.wizardService.getWizardById(id);
  }

  @Post()
  async createWizard(
    @Query('potter-api-key') potterApiKey: string,
    @Body() newWizard: WizardEntity,
  ): Promise<WizardEntity> {
    return await this.wizardService.createNewWizard(newWizard, potterApiKey);
  }

  @Put()
  async updateWizard(
    @Query('potter-api-key') potterApiKey: string,
    @Body() wizardToBeUpdated: WizardEntity,
  ): Promise<WizardEntity> {
    return await this.wizardService.updateWizard(
      wizardToBeUpdated,
      potterApiKey,
    );
  }

  @Delete(':id')
  async deleteWizard(id: number): Promise<void> {
    await this.wizardService.deleteWizard(id);
  }
}

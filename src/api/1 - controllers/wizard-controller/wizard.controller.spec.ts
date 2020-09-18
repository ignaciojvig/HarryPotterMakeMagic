import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotterApiService } from 'src/api/2 - services/potterapi-service/potter-api.service';
import { WizardService } from 'src/api/2 - services/wizard-service/wizard.service';
import { WizardEntity } from 'src/api/3 - domain/Wizard/wizard.entity';
import { CrosscuttingResultHandler } from 'src/api/4 - infra/crosscutting-result-handler/crosscutting-result-handler';
import { DatabaseModule } from 'src/environment/database/database.module';
import { WizardController } from './wizard.controller';

describe('WizardController', () => {
  let wizardController: WizardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([WizardEntity]),
        HttpModule.register({ timeout: 5000, maxRedirects: 3 }),
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
      ],
      providers: [WizardService, PotterApiService, CrosscuttingResultHandler],
      controllers: [WizardController],
    }).compile();

    wizardController = module.get<WizardController>(WizardController);
  });

  it('should be defined', () => {
    expect(wizardController).toBeDefined();
  });
});

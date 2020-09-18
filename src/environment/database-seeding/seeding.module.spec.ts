import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WizardController } from 'src/api/1 - controllers/wizard-controller/wizard.controller';
import { PotterApiService } from 'src/api/2 - services/potterapi-service/potter-api.service';
import { WizardService } from 'src/api/2 - services/wizard-service/wizard.service';
import { WizardEntity } from 'src/api/3 - domain/Wizard/wizard.entity';
import { CrosscuttingResultHandler } from 'src/api/4 - infra/crosscutting-result-handler/crosscutting-result-handler';
import { DatabaseModule } from '../database/database.module';
import { SeedingModule } from './seeding.module';

describe('SeedingModule', () => {
  let testingModule: TestingModule;
  let wizardController: WizardController;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([WizardEntity]),
        HttpModule.register({ timeout: 5000, maxRedirects: 3 }),
        SeedingModule,
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      providers: [WizardService, PotterApiService, CrosscuttingResultHandler],
      controllers: [WizardController],
    }).compile();

    wizardController = testingModule.get<WizardController>(WizardController);
  });

  it('Remove seeded Wizard in order to test Seeding', done => {
    wizardController.deleteWizard(1).then(() => {
      done();
    });
  });

  it('Reloading Seeding Module', async done => {
    const seedingModule = testingModule.get<SeedingModule>(SeedingModule);

    new Promise(async () => {
      await seedingModule.seedDatabase();
      done();
    });
  });

  it('Reattempting Seeding with Default Wizard already Existing', async done => {
    const seedingModule = testingModule.get<SeedingModule>(SeedingModule);

    new Promise(async () => {
      await seedingModule.seedDatabase();
      done();
    });
  });
});

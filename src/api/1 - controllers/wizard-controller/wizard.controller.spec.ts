import { HttpException, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotterApiService } from 'src/api/2 - services/potterapi-service/potter-api.service';
import { WizardService } from 'src/api/2 - services/wizard-service/wizard.service';
import { WizardEntity } from 'src/api/3 - domain/Wizard/wizard.entity';
import { CrosscuttingResultHandler } from 'src/api/4 - infra/crosscutting-result-handler/crosscutting-result-handler';
import { SeedingModule } from 'src/environment/database-seeding/seeding.module';
import { DatabaseModule } from 'src/environment/database/database.module';
import { WizardController } from './wizard.controller';

describe('WizardController', () => {
  let testingModule: TestingModule;
  let wizardController: WizardController;
  let createdWizard: WizardEntity;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([WizardEntity]),
        HttpModule.register({ timeout: 5000, maxRedirects: 3 }),
        SeedingModule,
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
      ],
      providers: [WizardService, PotterApiService, CrosscuttingResultHandler],
      controllers: [WizardController],
    }).compile();

    wizardController = testingModule.get<WizardController>(WizardController);
  });

  it('should be defined', () => {
    expect(wizardController).toBeDefined();
  });

  it('Testing Get of All Wizards', done => {
    const wizardListExample: WizardEntity[] = [
      {
        id: 0,
        name: 'Harry Potter',
        house: '5a05e2b252f721a3cf2ea33f',
        school: 'Hogwarts School of Witchcraft and Wizardry',
        patronus: 'Deer',
      },
    ];

    jest
      .spyOn(wizardController, 'getAllWizards')
      .mockImplementation(async () => wizardListExample);

    wizardController.getAllWizards().then(x => {
      expect(Array.isArray(x)).toBe(true);
      done();
    });
  });

  it('Testing Get of All Wizards Filtering by Empty House Param', done => {
    const houseId = '';

    wizardController.getAllWizardsFilteringByHouse(houseId).catch(err => {
      expect(err).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Testing Get of All Wizards Filtering by House Param, but invalid with less than 24 characters', done => {
    const houseId = '5a05e2b252f721a3cf2ea33';

    wizardController.getAllWizardsFilteringByHouse(houseId).catch(err => {
      expect(err).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Testing Get of All Wizards Filtering by House Param, but invalid with more than 24 characters', done => {
    const houseId = '5a05e2b252f721a3cf2ea33fg';

    wizardController.getAllWizardsFilteringByHouse(houseId).catch(err => {
      expect(err).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Testing Get of All Wizards Filtering by House Param, but with a valid param', done => {
    const houseId = '5a05e2b252f721a3cf2ea33f';

    wizardController.getAllWizardsFilteringByHouse(houseId).then(x => {
      expect(Array.isArray(x)).toBe(true);
      done();
    });
  });

  it('Getting Wizard by Id, but with empty Param', done => {
    let wizardParam: number;

    wizardController.getWizardById(wizardParam).catch(err => {
      expect(err).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Getting Wizard by Id, but with nonexisting User by Id', done => {
    const wizardParam = 0;

    wizardController.getWizardById(wizardParam).catch(err => {
      expect(err).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Getting Wizard by Id, but with existing Wizard by Id', done => {
    const wizardParam = 1;

    wizardController.getWizardById(wizardParam).then(x => {
      expect(x).toBeTruthy();
      done();
    });
  });

  it('Creating a Wizard with a valid object but with an invalid API Key', done => {
    const invalidApiKey = 'dhdfhfdh';

    const newWizard = {
      name: 'Lucius Malfoy',
      school: 'Hogwarts School of Witchcraft and Wizardry',
      house: '5a05dc8cd45bd0a11bd5e071',
      patronus: 'Snake',
    } as WizardEntity;

    wizardController.createWizard(invalidApiKey, newWizard).catch(x => {
      expect(x).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Creating a Wizard with a valid object and a valid API Key but invalid House Id', done => {
    const validApiKey =
      '$2a$10$.FD0mrohlrgmE0eT8Ft67uLUk6OOJAEI1XM7Ug1kBihnj2pksGDYO';

    const newWizard = {
      name: 'Lucius Malfoy',
      school: 'Hogwarts School of Witchcraft and Wizardry',
      house: '5a05dc8cd4d0a11bd5edf071',
      patronus: 'Snake',
    } as WizardEntity;

    wizardController.createWizard(validApiKey, newWizard).catch(x => {
      expect(x).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Creating a Wizard with a valid object and a valid API Key', done => {
    const validApiKey =
      '$2a$10$.FD0mrohlrgmE0eT8Ft67uLUk6OOJAEI1XM7Ug1kBihnj2pksGDYO';

    const newWizard = {
      name: 'Lucius Malfoy',
      school: 'Hogwarts School of Witchcraft and Wizardry',
      house: '5a05dc8cd45bd0a11bd5e071',
      patronus: 'Snake',
    } as WizardEntity;

    wizardController.createWizard(validApiKey, newWizard).then(x => {
      expect(x).toBeTruthy();
      createdWizard = x;
      done();
    });
  });

  it('Updating a Wizard with a valid object but with an invalid API Key', done => {
    const invalidApiKey = 'dhdfhfdh';

    wizardController.updateWizard(invalidApiKey, createdWizard).catch(x => {
      expect(x).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Updating a Wizard with a valid object, with a valid API Key but the Id being from a non existing Wizard', done => {
    const validApiKey =
      '$2a$10$.FD0mrohlrgmE0eT8Ft67uLUk6OOJAEI1XM7Ug1kBihnj2pksGDYO';
    const wizardWithInvalidId = { ...createdWizard, id: 0 };

    wizardController.updateWizard(validApiKey, wizardWithInvalidId).catch(x => {
      expect(x).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Updating a Wizard with a valid object, with a valid API Key but with the House Id invalid', done => {
    const validApiKey =
      '$2a$10$.FD0mrohlrgmE0eT8Ft67uLUk6OOJAEI1XM7Ug1kBihnj2pksGDYO';
    const wizardWithInvalidHouseId = {
      ...createdWizard,
      house: 'aijsdffffffsasdfsdfdsfda',
    };

    wizardController
      .updateWizard(validApiKey, wizardWithInvalidHouseId)
      .catch(x => {
        expect(x).toBeInstanceOf(HttpException);
        done();
      });
  });

  it('Updating a Wizard with a valid object, with a valid API Key and a valid House Id', done => {
    const validApiKey =
      '$2a$10$.FD0mrohlrgmE0eT8Ft67uLUk6OOJAEI1XM7Ug1kBihnj2pksGDYO';
    const allValidWizard = {
      ...createdWizard,
      name: 'Draco Malfoy',
      patronus: 'Ferret',
    };

    wizardController.updateWizard(validApiKey, allValidWizard).then(x => {
      expect(x).toBeTruthy();
      done();
    });
  });

  it('Trying invalid path from PotterAPI while updating a Wizard with all valid params', done => {
    const potterApiService = testingModule.get<PotterApiService>(
      PotterApiService,
    );
    const configService = testingModule.get<ConfigService>(ConfigService);

    jest
      .spyOn(potterApiService, 'getPotterAPIFullPath')
      .mockImplementation((houseId, potterApiKey) => {
        return `${configService.get<string>(
          'POTTERAPI_HOUSE_VALIDATION_URL',
        )}blabla/${houseId}?key=${potterApiKey}`;
      });

    const validApiKey =
      '$2a$10$.FD0mrohlrgmE0eT8Ft67uLUk6OOJAEI1XM7Ug1kBihnj2pksGDYO';
    const allValidWizard = {
      ...createdWizard,
      name: 'Draco Malfoy',
      patronus: 'Ferret',
    };

    wizardController.updateWizard(validApiKey, allValidWizard).catch(err => {
      expect(err).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Remove the recently created Wizard but using an id from a non existing wizard', done => {
    const wizardIdParam = 0;

    wizardController.deleteWizard(wizardIdParam).catch(err => {
      expect(err).toBeInstanceOf(HttpException);
      done();
    });
  });

  it('Remove the recently created Wizard from Database', done => {
    wizardController.deleteWizard(createdWizard.id).then(() => {
      done();
    });
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

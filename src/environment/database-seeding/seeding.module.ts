import { Module, NestModule } from '@nestjs/common';
import { WizardEntity } from 'src/api/3 - domain/Wizard/wizard.entity';
import { EntityManager } from 'typeorm';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
})
export class SeedingModule implements NestModule {
  constructor(private readonly entityManager: EntityManager) {}

  async configure(): Promise<void> {
    const defaultWizard = await this.entityManager.findOne(WizardEntity, {
      id: 1,
    });

    if (!defaultWizard) {
      await this.entityManager.transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(WizardEntity, {
          id: 1,
          name: 'Sirius Black',
          house: '5a05e2b252f721a3cf2ea33f',
          school: 'Hogwarts School of Witchcraft and Wizardry',
          patronus: 'Black Dog',
        });
      });
    }
  }
}

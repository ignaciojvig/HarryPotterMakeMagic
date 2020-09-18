import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WizardEntity } from '../3 - domain/Wizard/wizard.entity';
import { InfraModule } from '../4 - infra/infra.module';
import { PotterApiService } from './potterapi-service/potter-api.service';
import { WizardService } from './wizard-service/wizard.service';

@Module({
  imports: [
    InfraModule,
    TypeOrmModule.forFeature([WizardEntity]),
    HttpModule.register({ timeout: 5000 }),
  ],
  providers: [WizardService, PotterApiService],
  exports: [WizardService, PotterApiService],
})
export class ServicesModule {}

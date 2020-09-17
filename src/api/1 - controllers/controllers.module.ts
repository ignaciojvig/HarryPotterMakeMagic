import { Module } from '@nestjs/common';
import { ServicesModule } from '../2 - services/services.module';
import { WizardController } from './wizard-controller/wizard.controller';

@Module({
  imports: [ServicesModule],
  controllers: [WizardController],
})
export class ControllersModule {}

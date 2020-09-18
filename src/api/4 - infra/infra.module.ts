import { Module } from '@nestjs/common';
import { CrosscuttingResultHandler } from './crosscutting-result-handler/crosscutting-result-handler';

@Module({
  providers: [CrosscuttingResultHandler],
  exports: [CrosscuttingResultHandler],
})
export class InfraModule {}

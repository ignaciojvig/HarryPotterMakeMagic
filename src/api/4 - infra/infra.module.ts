import { Module } from '@nestjs/common';
import { CommandHandler } from './command-handler/command-handler';

@Module({
  providers: [CommandHandler],
  exports: [CommandHandler],
})
export class InfraModule {}

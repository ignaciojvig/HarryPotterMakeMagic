import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WizardEntity } from 'src/api/3 - domain/Wizard/wizard.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'make-magic.sqlite3',
      entities: [WizardEntity],
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
})
export class DatabaseModule {}

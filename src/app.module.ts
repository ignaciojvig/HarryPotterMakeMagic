import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './api/1 - controllers/controllers.module';
import { SeedingModule } from './environment/database-seeding/seeding.module';
import { DatabaseModule } from './environment/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SeedingModule,
    ControllersModule,
  ],
})
export class AppModule {}

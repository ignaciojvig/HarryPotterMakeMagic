import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ControllersModule } from './api/1 - controllers/controllers.module';
import { SeedingModule } from './environment/database-seeding/seeding.module';
import { DatabaseModule } from './environment/database/database.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 10,
      max: 10,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SeedingModule,
    ControllersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

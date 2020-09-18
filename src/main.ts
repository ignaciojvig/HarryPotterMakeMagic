import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiExceptionFilter } from './api/4 - infra/api-exception-filter/api-exception-filter';
import { AppModule } from './app.module';
import { setupSwagger } from './environment/swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new ApiExceptionFilter());
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (nestApp: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Make Magic Swagger Surface')
    .setDescription('Swagger from Make Magic API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(nestApp, options);
  SwaggerModule.setup('swagger', nestApp, document);
};




import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });
  // Préfixe global pour toutes les routes API
  app.setGlobalPrefix('api');
  // Servir le dossier public en statique
  app.useStaticAssets(path.join(__dirname, '../public'));
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('API Gestion ESP')
    .setDescription('Documentation auto-générée par Swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { AppLogger } from './logger/logger.service';

async function bootstrap() {
  config();
  const PORT = Number(process.env.PORT) || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(AppLogger));
  app.enableCors();

  await readFile(resolve('doc', 'api.yaml'), { encoding: 'utf-8' })
    .then(yaml.load)
    .then((obj) => {
      SwaggerModule.setup('/docs', app, {
        ...(obj as OpenAPIObject),
        servers: [{ url: `http://localhost:${PORT}` }],
      });
    });

  await app.listen(PORT);
}
bootstrap();

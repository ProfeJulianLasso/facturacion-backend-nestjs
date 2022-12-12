// Libraries
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// Main Module
import { MainModule } from './modules/main/main.module';

// Configs
import { PipeValidator } from './modules/main/configs/pipe-validator.config';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe(PipeValidator));

  await app.listen(3000);
}
bootstrap();

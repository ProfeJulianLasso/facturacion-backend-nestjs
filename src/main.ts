import { NestFactory } from '@nestjs/core';
import { MainModule } from './main/main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();

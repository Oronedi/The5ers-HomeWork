import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';

import { CLIENT_URI, SERVER_PORT_NUMBER } from './environment';
import { AppModule } from './app/app.module';

const bootstrap = async () => {
  const app: INestApplication = await NestFactory.create(AppModule);
  const globalPrefix: string = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port: number = SERVER_PORT_NUMBER || 3000;
  app.enableCors({ origin: CLIENT_URI, credentials: true });
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
};

bootstrap();

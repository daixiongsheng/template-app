import './setup';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { prot, globalPrefix, host } from './app.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { winstonLogger } from './app.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
    abortOnError: false,
  });
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(prot, host);
}
bootstrap();

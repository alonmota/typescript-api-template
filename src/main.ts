import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import {
  HttpStatus,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

export async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Version',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
    }),
  );

  const port = 3000;
  await app.listen(port);

  console.info(`server running on ${await app.getUrl()}`);

  return app;
}
bootstrap();

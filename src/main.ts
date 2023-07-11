import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

import * as os from 'os';

import { ApiLogger } from './common/system/logger/api-logger';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DBConfig } from './config/db-config';
import { GlobalExceptionFilters } from './common/filters/global-exception.filters';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SystemProperties } from './config/system-properties';

const port = SystemProperties.port();

const apiStartNotification = `
*******************************
API Running: Onfly API
PORT: ${port}
USER: ${os.userInfo().username}
ENVIRONMENT: ${SystemProperties.environment()}
*******************************
`;

async function bootstrap() {
  const logger = new ApiLogger();
  const app: INestApplication = await NestFactory.create(AppModule, { logger });

  app.useGlobalFilters(new GlobalExceptionFilters(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      validationError: { target: false },
    }),
  );

  app.enableCors();

  // Endpoint padrao: Deve retornar 200 para funcionar com Ingress
  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/') {
      res.status(HttpStatus.OK).send('Onfly API: It works!');
      return;
    }

    next();
  });

  if (!!port) {
    const dataSourceOptions: DataSourceOptions =
      DBConfig.connectionOptions as DataSourceOptions;
    const conn = new DataSource(dataSourceOptions);

    conn.initialize().then(async () => {
      const server = await app.listen(port, async () => {
        try {
          await conn.runMigrations({ transaction: 'all' });
          console.info(
            'Checagem de versionamento do banco de dados concluida com sucesso...',
          );
        } catch (error) {
          app.close();
          console.error(
            '"Falha ao tentar atualizar versao do banco de dados!\n',
            error,
          );
          throw { error };
        }

        console.info(apiStartNotification);
      });

      server.setTimeout(120000);
    });
  } else {
    console.warn('Porta para inicio do servidor não definida.');
  }
}

bootstrap();

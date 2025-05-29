import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { ConfigService } from '@nestjs/config';


import { ConfigKey } from './common/enums/config.enum';
import helmet from 'helmet';


import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonLoggerService } from './logger/winston-logger.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // ✅ Required to buffer logs before logger is fully initialized
  });
  const configService = app.get(ConfigService);

  const logger = app.get(WinstonLoggerService); // ✅ Get logger from DI

  app.useLogger(logger); 

  app.setGlobalPrefix(`${configService.get(`${ConfigKey.APP}.apiPrefix`)}`);
  app.enableCors({ 
    origin: configService.get(`${ConfigKey.APP}.frontendUrl`) || '*',
    credentials: true
  });
  app.use(helmet());

  const isProduction = configService.get(`${ConfigKey.APP}.isProduction`);
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('api endpoints with request and response ')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Enter JWT token',
          in: 'header',
        },
        'access-token',
      )  
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document); 
  }


  const port = configService.get(`${ConfigKey.APP}.port`) || 3001;
  await app.listen(port);

  
  logger.log(`Application running in ${isProduction ? 'production' : 'development'} mode`);
  logger.log(`Server started on ${await app.getUrl()}`);
  if (!isProduction) {
    logger.log(`Swagger docs available at ${await app.getUrl()}/docs`);
  }
}

bootstrap();
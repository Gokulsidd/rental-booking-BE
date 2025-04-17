import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';


import { ConfigKey } from './common/enums/config.enum';
import helmet from 'helmet';


import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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
      .addBearerAuth()  
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document); 
  }


  const port = configService.get(`${ConfigKey.APP}.port`) || 3001;
  await app.listen(port);

  
  console.log(`Application running in ${isProduction ? 'production' : 'development'} mode`);
  console.log(`Server started on ${await app.getUrl()}`);
  if (!isProduction) {
    console.log(`Swagger docs available at ${await app.getUrl()}/docs`);
  }
}

bootstrap();
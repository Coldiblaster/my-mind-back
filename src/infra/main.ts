import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  patchNestJsSwagger();

  const config = new DocumentBuilder()
    .setTitle('My.Mind')
    .setDescription('The description of the my mind API')
    .setVersion('1.0')
    .addTag('Mind')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true, // Mantém a autorização entre atualizações de página
    },
  });

  await app.listen(port);
}

bootstrap();

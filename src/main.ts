import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const validationPipeService = require('@pipets/validation-pipes');

async function bootstrap() {
  try {
    validationPipeService();
    
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('Cats')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('cats')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch(err) {

  }
}
bootstrap();

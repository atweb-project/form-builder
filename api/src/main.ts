import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Form Builder API')
    .setDescription('A form builder API')
    .setVersion('1.0')
    .addTag('form-builder')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs/swagger', app, document);
  app.enableCors({
    origin: ['http://localhost:4200'],
  });
  await app.listen(3000);
}
bootstrap();

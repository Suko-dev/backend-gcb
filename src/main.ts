import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DuplicatedEntryExceptionFilter } from './shared/error/duplicateEntry.exception-filter';
import { EntityNotFoundExceptionFilter } from './shared/error/entityNotFound.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new DuplicatedEntryExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Doctor register')
    .setDescription('CRUD for doctors')
    .setVersion('1.0')
    .addTag('doctor')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);

  await app.listen(3000);
}
bootstrap();

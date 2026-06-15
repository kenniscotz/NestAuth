import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    // This will strip any properties that are not in the DTO
    whitelist: true,
    // This will throw an error if any extra properties are present in the request body
    forbidNonWhitelisted: true,
    // This will automatically transform payloads to be objects typed according to their DTO classes
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

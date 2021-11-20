import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe(
    {
      exceptionFactory: (errors) => new BadRequestException(errors),
    }
  ));
  await app.listen(3300);
}
bootstrap();

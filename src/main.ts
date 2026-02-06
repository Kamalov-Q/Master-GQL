import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundFilter } from './entity-not-found/entity-not-found.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3001
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new EntityNotFoundFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  await app.listen(PORT ?? 3000, () => {
    console.log(`Application running on http://localhost:${PORT}`);
  });
}
bootstrap();

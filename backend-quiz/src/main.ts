import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://191.101.78.119:6677', 'http://localhost:6677'],
  });
  const config = app.get(ConfigService);
  const logger = new Logger();
  const PORT = config.get<number>('SERVER_PORT_QUIZ') || 3333;
  await app.listen(PORT, () => {
    logger.log(`Server Running in Port: ${PORT}`);
  });
}
bootstrap();

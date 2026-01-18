import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for local development
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on: http://localhost:${port}`);
  console.log(`🌐 CORS enabled for: http://localhost:3000`);
}
bootstrap();

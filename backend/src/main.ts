import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for Codespaces - allow all origins
  app.enableCors({
    origin: true, // Allow all origins in Codespaces
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  });
  
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces for Codespaces
  
  console.log(`🚀 Backend running on: http://localhost:${port}`);
  console.log(`📡 Also available on Codespaces forwarded port`);
  console.log(`🌐 CORS enabled for all origins`);
}
bootstrap();
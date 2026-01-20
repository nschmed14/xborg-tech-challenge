import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Get port from Railway environment - CRITICAL for Railway
  const port = configService.get('PORT') || 3001;
  
  // Enable CORS
  app.enableCors({
    origin: configService.get('FRONTEND_URL') || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  
  console.log(`Starting server on port ${port}...`);
  console.log(`Environment: ${configService.get('NODE_ENV')}`);
  console.log(`Frontend URL: ${configService.get('FRONTEND_URL')}`);
  console.log(`Database URL: ${configService.get('DATABASE_URL') ? 'Set' : 'Not set'}`);
  
  // Listen on all network interfaces for Railway
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Server running on http://0.0.0.0:${port}`);
}
bootstrap();

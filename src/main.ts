import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('🚀 Starting application bootstrap...');
  console.log('Database URL configured:', !!process.env.DATABASE_URL);
  
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'], // Only log errors and warnings
  });
  
  // Get CORS origin from environment
  const corsOrigin = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || '*';
  
  app.enableCors({
    origin: corsOrigin === '*' ? corsOrigin : corsOrigin.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // Railway provides PORT environment variable
  const port = process.env.PORT || 3001;
  
  try {
    const server = await app.listen(port, '0.0.0.0'); // Listen on all interfaces
    console.log(`✓ Server listening on port ${port}`);
    console.log(`✓ Ready to accept requests`);
    
    // Set server timeouts
    server.setTimeout(300000); // 5 minute timeout
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Error handling for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  process.exit(1);
});

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error.message);
  process.exit(1);
});

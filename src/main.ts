import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('🚀 Starting application bootstrap...');
    console.log('Database URL configured:', !!process.env.DATABASE_URL);
    
    const app = await NestFactory.create(AppModule, {
      logger: console, // Use full logger to see all output
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
    
    const server = await app.listen(port, '0.0.0.0');
    console.log(`✓ Server listening on port ${port}`);
    console.log(`✓ Ready to accept requests`);
    
    // Set server timeouts
    server.setTimeout(300000); // 5 minute timeout
    
    // Add graceful shutdown handlers
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });
    
    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    console.error('Error details:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Error handling for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

bootstrap();

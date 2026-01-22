import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: console, // Use full logger to see all output
      abortOnError: false, // Don't abort if there are non-critical errors
    });
    
    // Get CORS origin from environment - allow both old and new Vercel URLs
    const corsOrigin = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'https://xborg-tech-challenge-rose.vercel.app';
    
    const allowedOrigins = [
      'https://xborg-tech-challenge-rose.vercel.app',
      'https://frontend-ten-liard-73.vercel.app',
      'http://localhost:3000',
    ];
    
    app.enableCors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin) || corsOrigin === '*') {
          callback(null, true);
        } else {
          console.warn('CORS blocked origin:', origin);
          callback(null, false);
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
      exposedHeaders: ['Content-Length', 'Content-Type'],
      maxAge: 86400, // 24 hours
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
    
    // Railway provides PORT environment variable
    const port = process.env.PORT || 3001;
    
    // Bind to 0.0.0.0 to accept connections from anywhere
    const server = await app.listen(port, '0.0.0.0');
    console.log(`✓ Server listening on port ${port}`);
    
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

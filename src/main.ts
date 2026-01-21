import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting application bootstrap...');
  console.log('Database URL configured:', !!process.env.DATABASE_URL);
  
  const app = await NestFactory.create(AppModule);
  
  // Get CORS origin from environment
  const corsOrigin = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || '*';
  
  app.enableCors({
    origin: corsOrigin === '*' ? corsOrigin : corsOrigin.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // Add request logging middleware in development
  if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
      next();
    });
  }
  
  // Railway provides PORT environment variable
  const port = process.env.PORT || 3001;
  
  try {
    const server = await app.listen(port, '0.0.0.0'); // Listen on all interfaces
    console.log(`✓ Application is running on http://0.0.0.0:${port}`);
    console.log(`✓ CORS Origin: ${corsOrigin}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('✓ Server ready to accept requests');
    
    // Ensure server doesn't hang
    server.setTimeout(300000); // 5 minute timeout
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
}

// Error handling for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Add timeout to prevent bootstrap from hanging
const bootstrapTimeout = setTimeout(() => {
  console.error('✗ Bootstrap timeout - application failed to start within 30 seconds');
  process.exit(1);
}, 30000);

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
}).finally(() => {
  clearTimeout(bootstrapTimeout);
});

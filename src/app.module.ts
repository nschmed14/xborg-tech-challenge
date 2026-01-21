import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggingMiddleware } from './auth/logging.middleware';

const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development' || !isProduction;
  
  const baseConfig = {
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: isDevelopment, // Only sync in development
    logging: false, // Disable logging to speed up startup
    cache: true, // Enable caching
  };

  // Check if DATABASE_URL is set and not empty
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0) {
    console.log('Using PostgreSQL database (Production)');
    return {
      ...baseConfig,
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      // Aggressive connection settings for Railway
      extra: {
        max: 3,
        min: 0,
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 3000,
        statement_timeout: 5000,
      },
      // Don't wait for database to be fully ready
      keepConnectionAlive: true,
    } as TypeOrmModuleOptions;
  }

  console.log('Using SQLite database (Development)');
  return {
    ...baseConfig,
    type: 'sqlite',
    database: process.env.DATABASE_PATH || 'database.sqlite',
  } as TypeOrmModuleOptions;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    AuthModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('auth');
  }
}

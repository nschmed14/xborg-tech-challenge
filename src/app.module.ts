import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { LoggingMiddleware } from './auth/logging.middleware';

const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development' || !isProduction;
  const shouldSync = process.env.TYPEORM_SYNC === 'true' || isDevelopment || isProduction;
  
  const baseConfig = {
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: shouldSync, // Keep schema in sync for this challenge
    logging: false,
    cache: true,
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
        max: 5,
        min: 1,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      },
      // Don't wait for database to be fully ready
      keepConnectionAlive: true,
      retryAttempts: 3,
      retryDelay: 1000,
      autoLoadEntities: true,
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
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('auth');
  }
}

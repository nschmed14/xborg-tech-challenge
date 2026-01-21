import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggingMiddleware } from './auth/logging.middleware';

const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  const baseConfig = {
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // Disable synchronize for production - causes startup hangs
    // Database schema should already exist
    synchronize: !isProduction,
    logging: process.env.NODE_ENV === 'development',
  };

  // Check if DATABASE_URL is set and not empty
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0) {
    console.log('Using PostgreSQL database');
    return {
      ...baseConfig,
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      // Connection pool settings for Railway
      extra: {
        max: 5,
        min: 1,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      },
    } as TypeOrmModuleOptions;
  }

  console.log('Using SQLite database (DATABASE_URL not configured)');
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

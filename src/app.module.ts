import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggingMiddleware } from './auth/logging.middleware';

const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  const baseConfig = {
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: process.env.NODE_ENV === 'development',
  };

  if (process.env.DATABASE_URL) {
    return {
      ...baseConfig,
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    } as TypeOrmModuleOptions;
  }

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

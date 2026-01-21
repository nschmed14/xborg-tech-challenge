import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        // Use PostgreSQL if DATABASE_URL is provided (Railway), otherwise SQLite (local)
        if (process.env.DATABASE_URL) {
          return {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [User],
            synchronize: process.env.NODE_ENV !== 'production',
            ssl: process.env.NODE_ENV === 'production' ? {
              rejectUnauthorized: false,
            } : false,
          };
        } else {
          return {
            type: 'sqlite',
            database: process.env.DATABASE_PATH || 'database.sqlite',
            entities: [User],
            synchronize: true,
          };
        }
      },
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

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
        const isProduction = process.env.NODE_ENV === 'production';
        const resetDB = process.env.RESET_DB === 'true';
        
        // Use PostgreSQL if DATABASE_URL is provided (Railway), otherwise SQLite (local)
        if (process.env.DATABASE_URL) {
          return {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [User],
            synchronize: true, // Always synchronize
            dropSchema: resetDB, // Drop schema if RESET_DB=true
            ssl: isProduction ? {
              rejectUnauthorized: false,
            } : false,
          };
        } else {
          return {
            type: 'sqlite',
            database: process.env.DATABASE_PATH || 'database.sqlite',
            entities: [User],
            synchronize: true,
            dropSchema: resetDB,
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

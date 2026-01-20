import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get('DATABASE_URL');
        
        // For Railway PostgreSQL
        if (databaseUrl && databaseUrl.startsWith('postgres')) {
          return {
            type: 'postgres',
            url: databaseUrl,
            ssl: configService.get('NODE_ENV') === 'production' ? {
              rejectUnauthorized: false
            } : false,
            synchronize: true,
            autoLoadEntities: true,
            logging: true,
          };
        }
        
        // Fallback to SQLite for development
        return {
          type: 'sqlite',
          database: configService.get('DATABASE_PATH') || './database.sqlite',
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

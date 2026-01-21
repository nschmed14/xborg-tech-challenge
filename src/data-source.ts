import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';

// Create configuration based on environment
const config: any = process.env.DATABASE_URL 
  ? {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User],
      migrations: [],
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false,
      } : false,
    }
  : {
      type: 'sqlite',
      database: process.env.DATABASE_PATH || 'database.sqlite',
      entities: [User],
      migrations: [],
      synchronize: true,
    };

export const AppDataSource = new DataSource(config);

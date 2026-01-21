import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_URL ? 'postgres' : 'sqlite',
  url: process.env.DATABASE_URL,
  database: process.env.DATABASE_PATH || 'database.sqlite',
  entities: [User],
  migrations: [],
  synchronize: true,
  ssl: process.env.NODE_ENV === 'production' && process.env.DATABASE_URL ? {
    rejectUnauthorized: false,
  } : undefined,
});

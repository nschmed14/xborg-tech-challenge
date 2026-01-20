import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH || 'database.sqlite',
  entities: [User],
  migrations: [],
  synchronize: true,
});

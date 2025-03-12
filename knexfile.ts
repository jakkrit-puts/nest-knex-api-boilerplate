import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password11',
      database: process.env.DB_NAME || 'nest_db',
    },
    pool: {
      min: 2,  // Increase if needed
      max: 10, // Increase to allow more concurrent connections
      acquireTimeoutMillis: 60000, // Wait longer before timeout
      idleTimeoutMillis: 30000, // Release idle connections
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;

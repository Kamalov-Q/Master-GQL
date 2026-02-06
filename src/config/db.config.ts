import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

function getDatabaseUrl(): string {
  if (process.env.DB_USER && process.env.DB_HOST) {
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD ?? '';
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT ?? '5432';
    const name = process.env.DB_NAME ?? 'app_db';
    return `postgres://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${name}`;
  }
  return process.env.DATABASE_URL ?? '';
}

export default registerAs('dbconfig.dev', (): PostgresConnectionOptions => ({
    type: 'postgres',
    url: getDatabaseUrl(),
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: true,
}));

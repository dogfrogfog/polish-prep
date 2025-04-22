import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: '.env.local' });

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config; 
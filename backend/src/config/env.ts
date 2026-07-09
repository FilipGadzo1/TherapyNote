import 'dotenv/config';

export const env = {
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-prod',
  nextAuthSecret: process.env.NEXTAUTH_SECRET || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
};

if (!env.databaseUrl) throw new Error('DATABASE_URL not set');
if (env.nodeEnv === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET required in production');
}

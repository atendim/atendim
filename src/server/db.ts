import { env } from '@/env';
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error']
  });

if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
  globalThis.prisma = db;
}

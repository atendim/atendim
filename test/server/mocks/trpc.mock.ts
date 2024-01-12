import { callerFactory } from '@/server/api/root';
import { NextRequest } from 'next/server';
import { dbMock } from './db.mock';
import { translations } from './i18n.mock';

export const caller = callerFactory({
  db: dbMock,
  headers: {} as Headers,
  req: {} as NextRequest,
  t: translations as any
});

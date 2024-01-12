import { callerFactory } from '@/server/api/root';
import { dbMock } from './db.mock';
import { translations } from './i18n.mock';

export const caller = callerFactory({
  db: dbMock,
  headers: {} as Headers,
  t: translations as any
});

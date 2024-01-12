import { Context } from '@/server/api/context';
import { callerFactory } from '@/server/api/root';
import { dbMock } from './db.mock';
import { translations } from './i18n.mock';

export const caller = callerFactory({
  db: dbMock,
  t: translations as unknown as Context['t'],
  headers: {} as Headers
});

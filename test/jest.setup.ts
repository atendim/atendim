import { mockReset } from 'jest-mock-extended';
import { dbMock } from './server/mocks/db.mock';
import { translations } from './server/mocks/i18n.mock';

jest.mock('@/server/db', () => ({
  db: dbMock
}));

beforeEach(() => {
  if (dbMock) {
    mockReset(dbMock);
  }
});

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue('')
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockReturnValue(translations)
}));

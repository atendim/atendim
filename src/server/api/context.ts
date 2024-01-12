import { LOCALE_COOKIE, defaultLocale } from '@/i18n';
import { db } from '@/server/db';
import { getTranslations } from 'next-intl/server';
import { NextRequest } from 'next/server';

interface ContextOptions {
  // session: Session | null
  headers: Headers;
  req: NextRequest;
}

export async function createTRPCContext(_opts: ContextOptions) {
  const locale = _opts.req.cookies.get(LOCALE_COOKIE)?.value;
  const t = await getTranslations({ locale: locale ?? defaultLocale });

  return { db, t, ..._opts };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

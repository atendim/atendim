import { LOCALE_COOKIE, defaultLocale } from '@/i18n';
import { db } from '@/server/db';
import { getTranslations } from 'next-intl/server';

interface ContextOptions {
  // session: Session | null
  headers: Headers & { cookies?: string };
}

export async function createTRPCContext(_opts: ContextOptions) {
  const locale = _opts.headers.cookies
    ?.split(`${LOCALE_COOKIE}=`)[1]
    ?.split(';')[0];
  const t = await getTranslations({ locale: locale ?? defaultLocale });

  return { db, t, ..._opts };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

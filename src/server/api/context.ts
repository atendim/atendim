import { db } from '@/server/db';
import { getTranslations } from 'next-intl/server';

interface ContextOptions {
  // session: Session | null
  headers: Headers;
}

export async function createTRPCContext(_opts: ContextOptions) {
  const t = await getTranslations();
  return { db, t, ..._opts };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

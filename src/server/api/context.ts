import { db } from '@/server/db';

interface ContextOptions {
  // session: Session | null
  headers: Headers;
}

export async function createTRPCContext(_opts: ContextOptions) {
  return { db, ..._opts };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

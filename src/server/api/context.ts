interface ContextOptions {
  // session: Session | null
  headers: Headers;
}

export async function createTRPCContext(_opts: ContextOptions) {
  // TODO add session, db, etc
  return { ..._opts };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

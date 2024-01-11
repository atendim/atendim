import { signIn } from './routers/auth';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  signIn
});

export type AppRouter = typeof appRouter;

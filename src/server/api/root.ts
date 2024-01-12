import { auth } from './routers/auth';
import { createTRPCCaller, createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  auth
});

export const callerFactory = createTRPCCaller(appRouter);

export type AppRouter = typeof appRouter;

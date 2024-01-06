import { hello } from './routers/hello';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  hello
});

export type AppRouter = typeof appRouter;

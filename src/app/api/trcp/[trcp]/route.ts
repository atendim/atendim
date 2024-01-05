import { appRouter } from '@/server/api/root';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({})
});

import { createTRPCContext } from '@/server/api/context';
import { appRouter } from '@/server/api/root';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { env } from 'process';

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: {
      cookies: cookies().toString(),
      ...req.headers
    }
  });
};

const handler = (req: NextRequest, res: NextResponse) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
              error.cause
            );
          }
        : undefined
  });

export { handler as GET, handler as POST };

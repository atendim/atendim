'use client';

import { type AppRouter } from '@/server/api/root';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink, loggerLink } from '@trpc/react-query';
import React, { useState } from 'react';
import { getUrl, transformer } from './shared';

export const api = createTRPCReact<AppRouter>();

export function TRPCProvider({
  children,
  cookies
}: React.PropsWithChildren<{ cookies: string }>) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: op =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error)
        }),
        httpBatchLink({
          url: getUrl(),
          headers() {
            return {
              cookie: cookies,
              'x-trpc-source': 'react'
            };
          }
        })
      ]
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  );
}

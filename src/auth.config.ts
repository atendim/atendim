import { api } from '@/trpc/server';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authCredentialsValidator } from './lib/validators/auth-credentials';

export default {
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const validCredentials =
          authCredentialsValidator.safeParse(credentials);

        if (validCredentials.success) {
          return await api.auth.authorizeCredentials.mutate(
            validCredentials.data
          );
        }

        return null;
      }
    })
  ]
} satisfies NextAuthConfig;

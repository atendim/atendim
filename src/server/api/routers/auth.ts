import { authCredentialsValidator } from '@/lib/validators/auth-credentials';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const signIn = createTRPCRouter({
  hello: publicProcedure
    .input(authCredentialsValidator)
    .mutation(({ ctx, input }) => {
      const { email, password } = input;

      const existedUser = ctx.db.user.findUnique({
        where: {
          email
        }
      });
    })
});

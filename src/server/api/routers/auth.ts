import { authCredentialsValidator } from '@/lib/validators/auth-credentials';
import { HashUtils } from '@/server/utils/hash';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const auth = createTRPCRouter({
  signUp: publicProcedure
    .input(authCredentialsValidator)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const existedUser = await ctx.db.user.findUnique({
        where: {
          email
        }
      });

      if (existedUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: ctx.t('Auth.errors.email.emailAlreadyExists')
        });
      }

      const hashedPassword = await HashUtils.buildHashedPassword(password);

      const name = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');

      return await ctx.db.user.create({
        data: {
          email,
          password: hashedPassword,
          name
        }
      });
    })
});

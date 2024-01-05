import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const hello = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ teste: z.string() }))
    .query(({ input }) => {
      return { message: `Hello ${input.teste}` };
    })
});

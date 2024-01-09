import { z } from 'zod';

export const signInValidator = z.object({
  email: z
    .string({
      invalid_type_error: 'errors.email.invalid',
      required_error: 'errors.email.required'
    })
    .email(),
  password: z
    .string({
      required_error: 'errors.password.required'
    })
    .min(8, 'errors.password.minLength')
});

export type SignInSchema = z.infer<typeof signInValidator>;

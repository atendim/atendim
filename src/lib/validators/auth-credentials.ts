import { z } from 'zod';

export const authCredentialsValidator = z.object({
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

export type AuthSchema = z.infer<typeof authCredentialsValidator>;

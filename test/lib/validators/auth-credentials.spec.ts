import {
  AuthSchema,
  authCredentialsValidator
} from '@/lib/validators/auth-credentials';
import { ZodError } from 'zod';

describe('Auth Credentials Test', () => {
  it('should accept credentials with success', () => {
    const validCredentials: AuthSchema = {
      email: 'test@mail.com',
      password: 'rich_password'
    };

    expect(authCredentialsValidator.safeParse(validCredentials)).toStrictEqual({
      success: true,
      data: validCredentials
    });
  });

  it('should not accept wrong credentials', () => {
    const validCredentials: AuthSchema = {
      email: 'wrong.email',
      password: 'poor'
    };

    expect(authCredentialsValidator.safeParse(validCredentials)).toStrictEqual({
      error: new ZodError([
        {
          validation: 'email',
          code: 'invalid_string',
          message: 'errors.email.invalid',
          path: ['email']
        },
        {
          code: 'too_small',
          minimum: 8,
          type: 'string',
          inclusive: true,
          exact: false,
          message: 'errors.password.minLength',
          path: ['password']
        }
      ]),
      success: false
    });
  });
});

'use server';

import { signIn } from '@/auth';
import {
  AuthSchema,
  authCredentialsValidator
} from '@/lib/validators/auth-credentials';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getTranslations } from 'next-intl/server';

export async function signInCredentials(input: AuthSchema, callback?: string) {
  const validFields = authCredentialsValidator.safeParse(input);
  const t = await getTranslations('Auth');

  if (validFields.success) {
    try {
      await signIn('credentials', {
        ...validFields.data,
        redirectTo: callback || DEFAULT_LOGIN_REDIRECT
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { message: t('errors.credentials.incorrect') };
          default:
            return { message: t('errors.somethingWentWrong') };
        }
      }

      throw error;
    }
  }
}

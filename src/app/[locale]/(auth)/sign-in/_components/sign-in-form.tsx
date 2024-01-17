'use client';

import { signInCredentials } from '@/actions/sign-in-credentials';
import { CredentialsForm } from '@/components/credentials-form';
import { AuthSchema } from '@/lib/validators/auth-credentials';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

export function SignInForm() {
  const t = useTranslations('Auth');
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: AuthSchema) => {
    startTransition(() => {
      signInCredentials(data);
    });
  };

  return (
    <CredentialsForm onSubmit={onSubmit}>
      <CredentialsForm.SubmitButton disabled={isPending}>
        {t('signin')}
      </CredentialsForm.SubmitButton>
    </CredentialsForm>
  );
}

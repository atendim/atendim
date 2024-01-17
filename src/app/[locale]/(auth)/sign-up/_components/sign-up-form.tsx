'use client';

import { CredentialsForm } from '@/components/credentials-form';
import { AuthSchema } from '@/lib/validators/auth-credentials';
import { apiClient } from '@/trpc/provider';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export function SignUpForm() {
  const t = useTranslations('Auth');
  const signUp = apiClient.auth.signUp.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data, variables, context) {
      toast.success(t('success.signup'));
    }
  });

  const onSubmit = (data: AuthSchema) => {
    signUp.mutate(data);
  };

  return (
    <CredentialsForm onSubmit={onSubmit}>
      <CredentialsForm.SubmitButton disabled={signUp.isLoading}>
        {t('signup')}
      </CredentialsForm.SubmitButton>
    </CredentialsForm>
  );
}

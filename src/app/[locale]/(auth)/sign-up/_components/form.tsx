'use client';

import { Form } from '@/components/form';
import { Button } from '@/components/ui/button';
import {
  AuthSchema,
  authCredentialsValidator
} from '@/lib/validators/auth-credentials';
import { apiClient } from '@/trpc/provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SignUpForm() {
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit
  } = useForm<AuthSchema>({
    resolver: zodResolver(authCredentialsValidator)
  });

  const baseTranslations = 'Auth' as const;
  const t = useTranslations(baseTranslations);

  const signIn = apiClient.auth.signIn.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data, variables, context) {
      toast.success('Sucess');
    }
  });

  const onSubmit = (data: AuthSchema) => {
    signIn.mutate(data);
  };

  return (
    <form
      className='flex flex-col gap-8'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className='flex flex-col gap-4'>
        <Form.FormInput
          id='email'
          type='email'
          baseTranslations={baseTranslations}
          label='email'
          errorMessage={errors.email?.message?.toLowerCase()}
          {...register('email')}
        />
      </div>
      <div className='flex flex-col gap-4'>
        <Form.FormInput
          id='password'
          type='password'
          baseTranslations={baseTranslations}
          label='password'
          errorMessage={errors.password?.message}
          {...register('password')}
        />
      </div>
      <Button type='submit' disabled={signIn.isLoading}>
        {t('signup')}
      </Button>
    </form>
  );
}

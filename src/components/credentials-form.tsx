'use client';

import { Form } from '@/components/form';
import { Button } from '@/components/ui/button';
import {
  AuthSchema,
  authCredentialsValidator
} from '@/lib/validators/auth-credentials';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

interface CredentialsFormProps {
  onSubmit: SubmitHandler<AuthSchema>;
  onError?: SubmitErrorHandler<AuthSchema>;
  children: React.ReactNode;
}

export function CredentialsForm({ onSubmit, children }: CredentialsFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<AuthSchema>({
    resolver: zodResolver(authCredentialsValidator)
  });
  const { pending } = useFormStatus();
  const baseTranslations = 'Auth' as const;
  const t = useTranslations(baseTranslations);

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
          disabled={pending}
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
          disabled={pending}
          {...register('password')}
        />
      </div>
      {children}
    </form>
  );
}

CredentialsForm.SubmitButton = function CredentialsFormSubmitButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button type='submit' {...props}>
      {children}
    </Button>
  );
};

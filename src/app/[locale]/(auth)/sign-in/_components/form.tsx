'use client';

import { Form } from '@/components/form';
import { Button } from '@/components/ui/button';
import {
  SignInSchema,
  signInValidator
} from '@/lib/validators/sigin-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export function SignInForm() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInValidator)
  });

  const baseTranslations = 'Auth' as const;
  const t = useTranslations(baseTranslations);

  const onSubmit = (data: SignInSchema) => {
    // TODO handle login
    console.log(data);
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
      <Button type='submit'>{t('signin')}</Button>
    </form>
  );
}

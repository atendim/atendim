'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MessageKeys,
  NamespaceKeys,
  NestedKeyOf,
  NestedValueOf,
  useTranslations
} from 'next-intl';
import React, { ForwardedRef, HTMLInputTypeAttribute, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signInValidator = z.object({
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

type SignInSchema = z.infer<typeof signInValidator>;

export function Form() {
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
    console.log(data);
  };

  return (
    <form
      className='flex flex-col gap-8'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className='flex flex-col gap-4'>
        <FormInput
          id='email'
          type='email'
          baseTranslations={baseTranslations}
          label='email'
          errorMessage={errors.email?.message?.toLowerCase()}
          {...register('email')}
        />
      </div>
      <div className='flex flex-col gap-4'>
        <FormInput
          id='password'
          type='password'
          baseTranslations={baseTranslations}
          label='password'
          errorMessage={errors.password?.message}
          {...register('password')}
        />
      </div>
      <Button type='submit'>Sign In</Button>
    </form>
  );
}

type NestedKey = NamespaceKeys<Messages, NestedKeyOf<Messages>>;

type Target<Key extends NestedKey> = MessageKeys<
  NestedValueOf<
    {
      '!': IntlMessages;
    },
    [Key] extends [never] ? '!' : `!.${Key}`
  >,
  NestedKeyOf<
    NestedValueOf<
      {
        '!': IntlMessages;
      },
      [Key] extends [never] ? '!' : `!.${Key}`
    >
  >
>;

interface FormInputProps<Base extends NestedKey>
  extends Omit<React.ComponentProps<'input'>, 'ref' | 'id' | 'type'> {
  errorMessage?: string;
  baseTranslations: Base;
  label?: Target<Base>;
  type: HTMLInputTypeAttribute;
  id: string;
}

const FormInput = forwardRef(
  <Base extends NestedKey>(
    { errorMessage, baseTranslations, label, ...props }: FormInputProps<Base>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const t = useTranslations(baseTranslations);

    return (
      <div className='flex flex-col gap-2'>
        {label ? <Label htmlFor={props.id}>{t(label)}</Label> : null}
        <Input ref={ref} {...props} />
        {errorMessage ? (
          <span className='text-xs text-red-600'>
            {t(errorMessage as Target<Base>)}
          </span>
        ) : null}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

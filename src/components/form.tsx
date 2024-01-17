'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageKeyTarget, NestedKey } from '@/lib/i18n-utils';
import { useTranslations } from 'next-intl';
import { ForwardedRef, HTMLInputTypeAttribute, forwardRef } from 'react';

interface FormInputProps<Base extends NestedKey>
  extends Omit<React.ComponentProps<'input'>, 'ref' | 'id' | 'type'> {
  errorMessage?: string;
  baseTranslations: Base;
  label?: MessageKeyTarget<Base>;
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
            {t(errorMessage as MessageKeyTarget<Base>)}
          </span>
        ) : null}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export const Form = {
  FormInput
};

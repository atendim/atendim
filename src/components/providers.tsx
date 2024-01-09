import { TRPCProvider } from '@/trpc/provider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';

export async function Providers({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <TRPCProvider cookies={cookies().toString()}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </TRPCProvider>
  );
}

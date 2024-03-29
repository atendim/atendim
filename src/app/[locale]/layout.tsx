import '@/styles/globals.css';
import { TRPCProvider } from '@/trpc/provider';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
    keywords: t('keywords')
  };
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <TRPCProvider cookies={cookies().toString()}>{children}</TRPCProvider>
      </body>
    </html>
  );
}

import '@/styles/globals.css';
import { TRPCProvider } from '@/trpc/provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Atendim',
  description: 'Your best calendar app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <TRPCProvider cookies={cookies().toString()}>{children}</TRPCProvider>
      </body>
    </html>
  );
}

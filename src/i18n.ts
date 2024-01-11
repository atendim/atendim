import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'pt-BR'] as const;

export const defaultLocale = locales[1];

export const localeNames: Record<Locale, string> = {
  en: 'English (EUA)',
  'pt-BR': 'Português (Brasil)'
};

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale: pathLocale }) => {
  if (!locales.includes(pathLocale as any)) notFound();

  return {
    messages: (await import(`../messages/${pathLocale}.json`)).default
  };
});

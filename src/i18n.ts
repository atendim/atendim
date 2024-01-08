import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'pt-BR'] as const;

export const defaultLocale = locales[1];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  'pt-BR': 'Português'
};

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

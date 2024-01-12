import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { LOCALE_COOKIE, Locale, defaultLocale, locales } from './i18n';

export default async function middleware(req: NextRequest, res: NextResponse) {
  const urlLocale = req.nextUrl?.pathname.split('/')[1] as Locale;
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;

  const locale = ((urlLocale || cookieLocale) as Locale) || defaultLocale;

  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale: locale
  });

  const response = handleI18nRouting(req);

  response.cookies.set(LOCALE_COOKIE, locale);

  return response;
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)']
};

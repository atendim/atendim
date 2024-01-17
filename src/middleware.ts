import authConfig from '@/auth.config';
import { LOCALE_COOKIE, Locale, defaultLocale, locales } from '@/i18n';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from '@/routes';
import { UrlUtils } from '@/server/utils/url';
import NextAuth from 'next-auth';
import createIntlMiddleware from 'next-intl/middleware';

const { auth } = NextAuth(authConfig);

export default auth(req => {
  const nextPathname = req.nextUrl?.pathname;
  const urlLocale = UrlUtils.getLocaleFromUrl(nextPathname);
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;

  const locale = ((urlLocale || cookieLocale) as Locale) || defaultLocale;

  const pathnameWithoutLocale = UrlUtils.getPathnameWithoutLocale(
    nextPathname,
    locale
  );

  const isAuthPage = UrlUtils.pathnameIncludesIn(
    pathnameWithoutLocale,
    authRoutes
  );
  const isPublicPage = UrlUtils.pathnameIncludesIn(
    pathnameWithoutLocale,
    publicRoutes
  );
  const isApiAuthRoute = UrlUtils.pathnameStartsWith(
    nextPathname,
    apiAuthPrefix
  );

  const isUserAuthenticated = !!req.auth;

  const isApi = nextPathname.startsWith('/api');

  console.log({
    currentUrl: nextPathname,
    pathnameWithoutLocale,
    urlLocale,
    isApiAuthRoute,
    isAuthPage,
    isUserAuthenticated,
    isPublicPage,
    isApi,
    _: '--------------------------',
    toDashboard: isUserAuthenticated && (isAuthPage || isPublicPage),
    toSignIn:
      !isPublicPage && !isUserAuthenticated && !isAuthPage && !isApiAuthRoute
  });

  if (isUserAuthenticated && (isAuthPage || isPublicPage)) {
    const defaultLoginRedirect = new URL(
      UrlUtils.concatUrlWithLocale(
        nextPathname,
        locale,
        DEFAULT_LOGIN_REDIRECT
      ),
      req.nextUrl
    );
    return Response.redirect(defaultLoginRedirect);
  }

  if (!isPublicPage && !isUserAuthenticated && !isAuthPage && !isApiAuthRoute) {
    const signIn = new URL(
      UrlUtils.concatUrlWithLocale(nextPathname, locale, '/sign-in'),
      req.nextUrl
    );
    return Response.redirect(signIn);
  }

  if (!isApi) {
    const handleI18nRouting = createIntlMiddleware({
      locales,
      defaultLocale: locale
    });

    const response = handleI18nRouting(req);

    response.cookies.set(LOCALE_COOKIE, locale);

    return response;
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|favicon.ico).*)', '/', '/(api|trpc)(.*)']
};

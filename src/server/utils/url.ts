import { Locale } from '@/i18n';

function getLocaleFromUrl(url: string) {
  const locale = url.split('/')[1] as Locale | undefined;
  return isLocaleInUrl(url, locale) ? locale : null;
}

function isLocaleInUrl(url: string, locale?: Locale) {
  return locale ? url.includes(`/${locale}/`) : false;
}

function getPathnameWithoutLocale(url?: string, locale?: Locale) {
  if (!url || !locale) return '';
  return url.replaceAll(locale, '').replace('//', '/');
}

function pathnameIncludesIn<T>(pathname: string, route: T) {
  if (Array.isArray(route)) {
    return route.includes(pathname);
  }
  return false;
}

function pathnameStartsWith<T>(pathname: string, route: T) {
  if (Array.isArray(route)) {
    return route.some(route => pathname.startsWith(route));
  }
  return false;
}

function concatUrlWithLocale(url: string, locale: Locale, toConcat: string) {
  if (isLocaleInUrl(url, locale)) return toConcat;
  return `${locale}/${toConcat}`;
}

export const UrlUtils = {
  getLocaleFromUrl,
  isLocaleInUrl,
  getPathnameWithoutLocale,
  pathnameIncludesIn,
  pathnameStartsWith,
  concatUrlWithLocale
};

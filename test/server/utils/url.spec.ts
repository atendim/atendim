import { UrlUtils } from '@/server/utils/url';

describe('UrlUtils', () => {
  describe('getLocaleFromUrl', () => {
    it('should return locale from url', () => {
      const url = '/en/dashboard';
      const locale = 'en';

      expect(UrlUtils.getLocaleFromUrl(url)).toBe(locale);
    });

    it('should return none locale', () => {
      const url = '/dashboard';

      expect(UrlUtils.getLocaleFromUrl(url)).toBe(null);
    });
  });

  describe('isLocaleInUrl', () => {
    it('should return true', () => {
      const url = '/en/dashboard';
      const locale = 'en';

      expect(UrlUtils.isLocaleInUrl(url, locale)).toBe(true);
    });

    it('should return false with similar string', () => {
      const url = '/dashboard/env';
      const locale = 'en';

      expect(UrlUtils.isLocaleInUrl(url, locale)).toBe(false);
    });

    it('should return false with undefined locale', () => {
      const url = '/dashboard/env';

      expect(UrlUtils.isLocaleInUrl(url, undefined)).toBe(false);
    });
  });

  describe('getPathnameWithoutLocale', () => {
    it('should return pathname without locale', () => {
      const url = '/en/dashboard';
      const locale = 'en';

      expect(UrlUtils.getPathnameWithoutLocale(url, locale)).toBe('/dashboard');
    });

    it('should return empty string', () => {
      const url = '/dashboard';

      expect(UrlUtils.getPathnameWithoutLocale(url)).toBe('');
    });
  });

  describe('pathnameIncludesIn', () => {
    it('should return true with array', () => {
      const pathname = '/dashboard';
      const route = ['/dashboard', '/something'];

      expect(UrlUtils.pathnameIncludesIn(pathname, route)).toBe(true);
    });

    it('should return false with array', () => {
      const pathname = '/dashboard';
      const route = ['/other'];

      expect(UrlUtils.pathnameIncludesIn(pathname, route)).toBe(false);
    });

    it('should return false', () => {
      const pathname = '/dashboard';
      const route = '/dashboard';

      expect(UrlUtils.pathnameIncludesIn(pathname, route)).toBe(false);
    });
  });

  describe('pathnameStartsWith', () => {
    it('should return true with array', () => {
      const pathname = '/api/auth/something';
      const route = ['/api/auth', '/other'];

      expect(UrlUtils.pathnameStartsWith(pathname, route)).toBe(true);
    });

    it('should return false with array', () => {
      const pathname = '/dashboard';
      const route = ['/other'];

      expect(UrlUtils.pathnameStartsWith(pathname, route)).toBe(false);
    });
  });

  describe('concatUrlWithLocale', () => {
    it('should return url without concat', () => {
      const url = '/dashboard';
      const locale = 'en';
      const toConcat = 'dashboard';

      expect(UrlUtils.concatUrlWithLocale(url, locale, toConcat)).toBe(
        'en/dashboard'
      );
    });

    it('should return url with locale and concat', () => {
      const url = '/dashboard';
      const locale = 'en';
      const toConcat = 'dashboard';

      expect(UrlUtils.concatUrlWithLocale(url, locale, toConcat)).toBe(
        'en/dashboard'
      );
    });
  });
});

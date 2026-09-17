import { DEFAULT_LOCALE } from '@/constants'

function normalizePath(path = '') {
  if (!path || path === '/') return ''
  return path.startsWith('/') ? path : `/${path}`
}

/** Public URL for a locale. English (default) is unprefixed: `/`, `/blog`. */
export function localePath(locale: string, path = '') {
  const normalized = normalizePath(path)

  if (locale === DEFAULT_LOCALE) {
    return normalized || '/'
  }

  return `/${locale}${normalized}`
}

export function stripLocalePrefix(pathname: string, locale: string) {
  if (pathname === `/${locale}`) return '/'
  if (pathname.startsWith(`/${locale}/`)) {
    return pathname.slice(locale.length + 1)
  }
  return pathname || '/'
}

export function pageAlternates(locale: string, path = '') {
  const en = localePath('en', path)
  const ja = localePath('ja', path)

  return {
    canonical: localePath(locale, path),
    languages: {
      en,
      ja,
      'x-default': en,
    },
  }
}

export function pageAlternates(locale: string, path = '') {
  const normalized = path.startsWith('/') || path === '' ? path : `/${path}`

  return {
    canonical: `/${locale}${normalized}`,
    languages: {
      en: `/en${normalized}`,
      ja: `/ja${normalized}`,
      'x-default': `/en${normalized}`,
    },
  }
}

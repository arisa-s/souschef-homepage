export const LOCALE_MAPPING = {
    en: 'English',
    ja: 'Japanese'
  } as const;

  export type LocaleOptions = keyof typeof LOCALE_MAPPING;

  export const DEFAULT_LANG: LocaleOptions = 'en';

  // If you need to access the full names:
  export const LOCALE_OPTIONS = Object.keys(LOCALE_MAPPING) as LocaleOptions[];
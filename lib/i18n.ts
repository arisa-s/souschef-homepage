import { Resource } from '../node_modules/i18next/typescript/options';
import { createInstance, i18n } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '@/i18nConfig';
import { LocaleOptions } from '@/constants';

const DEFAULT_NAMESPACES = ['common', 'layout'];

export default async function initTranslations(
  locale: LocaleOptions,
  namespacesProps: string[],
  i18nInstance?: i18n,
  resources?: Resource
) {
  const namespaces = [...namespacesProps, ...DEFAULT_NAMESPACES]
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: LocaleOptions, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  };
}
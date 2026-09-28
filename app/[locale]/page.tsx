import { MarketingHome } from '@/components/home/MarketingHome'
import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { canonicalUrl, ogLocale, pageAlternates } from '@/lib/seo'
import { setI18n, setLocale } from '@/serverContexts'
import { Trans } from 'react-i18next/TransWithoutContext'

const i18nNamespaces = ['home']

type HomeProps = {
  params: Promise<{ locale: LocaleOptions }>
}

export async function generateMetadata({ params }: HomeProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['home', 'layout'])
  const title = t('layout:appTitle')
  const description = t('layout:appDescription')

  return {
    alternates: pageAlternates(locale),
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl(locale),
      siteName: 'Souschef',
      type: 'website',
      locale: ogLocale(locale),
    },
  }
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  const { i18n, t } = await initTranslations(locale, i18nNamespaces)

  setI18n(i18n)
  setLocale(locale)

  return (
    <MarketingHome
      locale={locale}
      metaTitle={t('layout:appTitle')}
      metaDescription={t('layout:appDescription')}
      heroAlt={t('heroAlt')}
      rating={t('appStoreRating')}
      lovedBy={t('appStoreLovedBy')}
      h1={
        <Trans
          i18n={i18n}
          t={t}
          i18nKey="recipeToTable"
          components={{
            italic: <span className="mr-[0.2em] italic" />,
          }}
        />
      }
      header={t('header')}
      downloadDisclaimer={t('downloadDisclaimer')}
      heroDownloadContent="homepage_hero"
    />
  )
}

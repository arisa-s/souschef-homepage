import { MarketingHome } from '@/components/home/MarketingHome'
import { DownloadContent, LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { canonicalUrl, ogLocale, pageAlternates } from '@/lib/seo'
import { setI18n, setLocale } from '@/serverContexts'
import type { Metadata } from 'next'

type LandingVariant = 'free' | 'recipe'

const variantPath: Record<LandingVariant, string> = {
  free: '/free-recipe-keeper-app',
  recipe: '/recipe-keeper',
}

const variantContent: Record<LandingVariant, DownloadContent> = {
  free: 'free_recipe_keeper_app',
  recipe: 'recipe_keeper',
}

type LandingProps = {
  locale: LocaleOptions
  variant: LandingVariant
}

export async function landingMetadata({ locale, variant }: LandingProps): Promise<Metadata> {
  const { t } = await initTranslations(locale, ['landing'])
  const title = t(`${variant}.metaTitle`)
  const description = t(`${variant}.metaDescription`)
  const path = variantPath[variant]

  return {
    title,
    description,
    alternates: pageAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: canonicalUrl(locale, path),
      siteName: 'Souschef',
      type: 'website',
      locale: ogLocale(locale),
    },
  }
}

export async function KeeperLanding({ locale, variant }: LandingProps) {
  const { i18n, t } = await initTranslations(locale, ['landing', 'home'])
  setI18n(i18n)
  setLocale(locale)

  return (
    <MarketingHome
      locale={locale}
      path={variantPath[variant]}
      metaTitle={t(`${variant}.metaTitle`)}
      metaDescription={t(`${variant}.metaDescription`)}
      heroAlt={t('home:heroAlt')}
      rating={t('home:appStoreRating')}
      lovedBy={t('home:appStoreLovedBy')}
      h1={t(`${variant}.h1`)}
      header={t(`${variant}.lead`)}
      downloadDisclaimer={t(`${variant}.disclaimer`)}
      heroDownloadContent={variantContent[variant]}
    />
  )
}

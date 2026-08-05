import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { pageAlternates } from '@/lib/seo'
import { setI18n } from '@/serverContexts'
import i18nConfig from '@/i18nConfig'
import LegalPageLayout from '@/components/layout/LegalPageLayout'
import { PrivacyPolicyContent } from '@/components/privacy/PrivacyPolicyContent'

type PrivacyProps = { params: Promise<{ locale: LocaleOptions }> }

type PrivacyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }

type PrivacySection = {
  title: string
  blocks: PrivacyBlock[]
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function Privacy({ params }: PrivacyProps) {
  const { locale } = await params

  const { i18n, t } = await initTranslations(locale, ['privacy'])
  setI18n(i18n)

  const intro = t('intro', { returnObjects: true }) as string[]
  const sections = t('sections', { returnObjects: true }) as PrivacySection[]
  const lastUpdated = t('lastUpdated')
  const lastUpdatedLabel = `${t('common:lastUpdatedAt')}${new Date(lastUpdated).toLocaleDateString(
    locale,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )}`

  return (
    <LegalPageLayout title={t('pageTitle')} lastUpdated={lastUpdatedLabel}>
      <PrivacyPolicyContent intro={intro} sections={sections} />
    </LegalPageLayout>
  )
}

export async function generateMetadata({ params }: PrivacyProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['privacy', 'layout'])
  return {
    title: t('privacy:pageTitle'),
    alternates: pageAlternates(locale, '/privacy'),
  }
}

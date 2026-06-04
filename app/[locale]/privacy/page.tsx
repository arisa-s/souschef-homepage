import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { setI18n } from '@/serverContexts'
import i18nConfig from '@/i18nConfig'
import PageLayout from '@/components/layout/PageLayout'
import { PrivacyPolicyContent } from '@/components/privacy/PrivacyPolicyContent'

type PrivacyProps = { params: Promise<{ locale: LocaleOptions }> }

type PrivacySection = {
  title: string
  paragraphs?: string[]
  listItems?: string[]
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function Privacy({ params }: PrivacyProps) {
  const { locale } = await params

  const { i18n, t } = await initTranslations(locale, ['privacy'])
  setI18n(i18n)

  const sections = t('sections', { returnObjects: true }) as PrivacySection[]
  const lastUpdated = t('lastUpdated')

  return (
    <PageLayout title={t('pageTitle')}>
      <div className="w-full">
        <div className="container mx-auto flex min-h-screen max-w-4xl flex-col gap-4 p-6 sm:border-x sm:p-12">
          <PrivacyPolicyContent intro={t('intro')} sections={sections} />
          <p className="ml-auto text-text-secondary md:pt-6 md:text-xl">
            {t('common:lastUpdatedAt')}{' '}
            {new Date(lastUpdated).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

export async function generateMetadata({ params }: PrivacyProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['privacy', 'layout'])
  return {
    title: t('privacy:pageTitle'),
  }
}

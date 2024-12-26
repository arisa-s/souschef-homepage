import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { setI18n } from '@/serverContexts'
import i18nConfig from '@/i18nConfig'
import { getLatestPrivacy } from '@/sanity/lib/repo/privacy'
import { PortableText } from 'next-sanity'

type PrivacyProps = { params: Promise<{ locale: LocaleOptions }> }

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function Privacy({ params }: PrivacyProps) {
  const { locale } = await params
  const privacy = await getLatestPrivacy(locale)

  const { i18n, t } = await initTranslations(locale, ['privacy'])
  setI18n(i18n)

  if (!privacy) {
    // todo: redirect to error page
    return null
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <main className="w-full items-center sm:items-start">
        {Array.isArray(privacy.body) && <PortableText value={privacy.body} />}
        <p>
          {t('common:lastUpdatedAt')} {new Date(privacy._updatedAt).toDateString()}
        </p>
      </main>
    </div>
  )
}

export async function generateMetadata({ params }: PrivacyProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['privacy', 'layout'])
  return {
    title: t('privacy:pageTitle'),
  }
}

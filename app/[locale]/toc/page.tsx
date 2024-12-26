import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { setI18n } from '@/serverContexts'
import i18nConfig from '@/i18nConfig'
import { getLatestToc } from '@/sanity/lib/repo/toc'
import { PortableText } from 'next-sanity'

type TocProps = { params: Promise<{ locale: LocaleOptions }> }

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function Toc({ params }: TocProps) {
  const { locale } = await params
  const toc = await getLatestToc(locale)

  const { i18n, t } = await initTranslations(locale, ['toc'])
  setI18n(i18n)

  if (!toc) {
    // todo: redirect to error page
    return null
  }
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <main className="w-full items-center sm:items-start">
        {Array.isArray(toc.body) && <PortableText value={toc.body} />}
        <p>
          {t('common:lastUpdatedAt')} {new Date(toc._updatedAt).toDateString()}
        </p>
      </main>
    </div>
  )
}

export async function generateMetadata({ params }: TocProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['toc', 'layout'])
  return {
    title: t('toc:pageTitle'),
  }
}

import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { setI18n } from '@/serverContexts'
import i18nConfig from '@/i18nConfig'
import { getLatestToc } from '@/sanity/lib/repo/toc'
import { PortableText } from 'next-sanity'
import PageLayout from '@/components/layout/PageLayout'
import { SanityComponents } from '@/sanity/lib/components/SanityComponents'

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
    <PageLayout title={t('pageTitle')}>
      <div className="w-full">
        <div className="container mx-auto flex min-h-screen max-w-4xl flex-col gap-4 p-6 sm:border-x sm:p-12">
          {Array.isArray(toc.body) && (
            <PortableText value={toc.body} components={SanityComponents} />
          )}
          <p className="ml-auto text-text-secondary md:pt-6 md:text-xl">
            {t('common:lastUpdatedAt')} {new Date(toc._updatedAt).toDateString()}
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

export async function generateMetadata({ params }: TocProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['toc', 'layout'])
  return {
    title: t('toc:pageTitle'),
  }
}

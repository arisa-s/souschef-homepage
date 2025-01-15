import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { setI18n } from '@/serverContexts'
import i18nConfig from '@/i18nConfig'
import { getFaqs } from '@/sanity/lib/repo/faq'
import { PortableText } from 'next-sanity'
import PageLayout from '@/components/layout/PageLayout'
import { SanityComponents } from '@/sanity/lib/components/SanityComponents'

type FaqProps = { params: Promise<{ locale: LocaleOptions }> }

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function Faq({ params }: FaqProps) {
  const { locale } = await params
  const faqs = await getFaqs(locale)

  const { i18n, t } = await initTranslations(locale, ['faq'])
  setI18n(i18n)

  return (
    <PageLayout title={t('pageTitle')}>
      <div className="w-full">
        <div className="container mx-auto flex min-h-screen max-w-4xl flex-col gap-4 p-6 sm:border-x sm:p-12">
          {faqs.map((faq) => (
            <div key={faq._id} className="flex flex-col space-y-4 p-6">
              <h2 className="text-lg font-medium md:text-2xl">{faq.question}</h2>
              {Array.isArray(faq.answer) && (
                <PortableText value={faq.answer} components={SanityComponents} />
              )}
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export async function generateMetadata({ params }: FaqProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['faq', 'layout'])
  return {
    title: t('faq:pageTitle'),
  }
}

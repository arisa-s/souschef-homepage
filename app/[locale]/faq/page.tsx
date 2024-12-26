import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { setI18n } from '@/serverContexts'
import i18nConfig from '@/i18nConfig'
import { getFaqs } from '@/sanity/lib/repo/faq'
import { PortableText } from 'next-sanity'

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
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <main className="w-full items-center divide-y sm:items-start">
        <div className="flex flex-col p-6">
          <h1 className="font-accent text-3xl font-medium">{t('pageTitle')}</h1>
          {faqs.map((faq) => (
            <div key={faq._id} className="flex flex-col p-6">
              <h2 className="text-xl font-bold">{faq.question}</h2>
              {Array.isArray(faq.answer) && <PortableText value={faq.answer} />}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function generateMetadata({ params }: FaqProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['faq', 'layout'])
  return {
    title: t('faq:pageTitle'),
  }
}

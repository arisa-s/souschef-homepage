import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { pageAlternates } from '@/lib/seo'
import { setI18n } from '@/serverContexts'
import i18nConfig from '@/i18nConfig'
import { getFaqs } from '@/sanity/lib/repo/faq'
import Image from 'next/image'
import { HiArrowLongLeft } from 'react-icons/hi2'
import BackButton from '@/components/layout/BackButton'

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
    <div className="relative mx-auto flex min-h-screen w-full max-w-8xl flex-col">
      <div className="flex items-start px-6 pt-6 sm:absolute sm:left-6 sm:top-6 sm:px-0 sm:pt-0">
        <BackButton className="text-2xl sm:text-5xl">
          <HiArrowLongLeft />
        </BackButton>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 pb-24 pt-4 sm:pt-16">
        <header className="mb-14 flex flex-col items-center text-center sm:mb-20">
          <Image
            src="/images/mascot.webp"
            alt="Souschef"
            width={80}
            height={80}
            priority
            className="mb-6 size-16 rounded-2xl sm:mb-8 sm:size-20"
          />
          <h1 className="font-accent text-3xl font-bold tracking-tight sm:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-3 max-w-md text-base text-text-secondary sm:mt-4 sm:text-lg">
            {t('pageDescription')}
          </p>
        </header>

        <div className="border-t border-neutral-400">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group border-b border-neutral-400 py-7 sm:py-9"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 marker:content-none [&::-webkit-details-marker]:hidden">
                <h2 className="font-accent text-xl font-bold leading-snug text-text-primary sm:text-2xl md:text-[1.65rem] md:leading-tight">
                  {faq.question}
                </h2>
                <span
                  aria-hidden
                  className="relative flex size-6 shrink-0 items-center justify-center text-text-primary"
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current transition-opacity duration-150 group-open:opacity-0" />
                </span>
              </summary>
              <p className="mt-5 max-w-prose text-base leading-7 text-text-primary sm:mt-6 sm:text-lg sm:leading-8">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: FaqProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['faq', 'layout'])
  return {
    title: t('faq:pageTitle'),
    description: t('faq:pageDescription'),
    alternates: pageAlternates(locale, '/faq'),
  }
}

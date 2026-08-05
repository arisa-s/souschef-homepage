import DownloadAppModal from '@/components/home/DownloadAppModal'
import AppDownloadButtons from '@/components/shared/AppDownloadButtons'
import SiteContainer from '@/components/layout/SiteContainer'
import { isSubscriptionEnabled, LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { pageAlternates } from '@/lib/seo'
import { setI18n, setLocale } from '@/serverContexts'
import Image from 'next/image'
import { Trans } from 'react-i18next/TransWithoutContext'
import {
  FiCamera,
  FiEdit3,
  FiFileText,
  FiGlobe,
  FiMessageSquare,
  FiPlusSquare,
} from 'react-icons/fi'

const i18nNamespaces = ['home']

type HomeProps = {
  params: Promise<{ locale: LocaleOptions }>
}

export async function generateMetadata({ params }: HomeProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['layout'])

  return {
    alternates: pageAlternates(locale),
    title: t('layout:appName'),
    description: t('layout:appDescription'),
  }
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  const { i18n, t } = await initTranslations(locale, i18nNamespaces)

  setI18n(i18n)
  setLocale(locale)

  const importOptions = [
    {
      icon: <FiCamera aria-hidden />,
      title: t('importGuide.options.scan.title'),
      description: t('importGuide.options.scan.description'),
      guide: t('importGuide.options.scan.guide'),
    },
    {
      icon: <FiFileText aria-hidden />,
      title: t('importGuide.options.text.title'),
      description: t('importGuide.options.text.description'),
      guide: t('importGuide.options.text.guide'),
    },
    {
      icon: <FiGlobe aria-hidden />,
      title: t('importGuide.options.browse.title'),
      description: t('importGuide.options.browse.description'),
      guide: t('importGuide.options.browse.guide'),
    },
    {
      icon: <FiEdit3 aria-hidden />,
      title: t('importGuide.options.create.title'),
      description: t('importGuide.options.create.description'),
      guide: t('importGuide.options.create.guide'),
    },
    {
      icon: <FiMessageSquare aria-hidden />,
      title: t('importGuide.options.chatgpt.title'),
      description: t('importGuide.options.chatgpt.description'),
      guide: t('importGuide.options.chatgpt.guide'),
    },
    {
      icon: <FiPlusSquare aria-hidden />,
      title: t('importGuide.options.claude.title'),
      description: t('importGuide.options.claude.description'),
      guide: t('importGuide.options.claude.guide'),
    },
  ]

  const promptIdeas = [
    t('importGuide.promptIdeas.expiring'),
    t('importGuide.promptIdeas.minimal'),
    t('importGuide.promptIdeas.diet'),
  ]

  return (
    <div className="flex w-full flex-1 flex-col">
      <SiteContainer
        as="section"
        className="grid flex-1 grid-cols-1 items-center py-6 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-0"
      >
        {/* Photo first below lg; photo left / copy right at lg+ */}
        <div className="mx-auto w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem] lg:max-w-[20rem] xl:max-w-[22rem] -mt-8 lg:-mt-0">
          <Image
            src="/images/home/hero.webp"
            alt={t('heroAlt')}
            width={572}
            height={1024}
            priority
            sizes="(max-width: 640px) 18rem, (max-width: 1024px) 23rem, 27rem"
            className="h-auto w-full"
          />
        </div>

        <div className="mx-auto w-full max-w-[46rem] text-center lg:mx-0 lg:text-left">
          <h1 className="font-accent text-[1.3rem] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[1.5rem] lg:text-[2rem] xl:text-[2.5rem]">
            <Trans
              i18n={i18n}
              t={t}
              i18nKey="recipeToTable"
              components={{
                italic: <span className="italic mr-[0.2em]" />,
              }}
            />
          </h1>

          <p className="mx-auto mt-4 max-w-[42rem] text leading-7 text-text-secondary sm:text-xl sm:leading-8 lg:mx-0 lg:text-2xl lg:leading-[1.4]">
            {t('header')}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col items-center lg:items-start">
            <div className="flex justify-center lg:justify-start">
              <AppDownloadButtons />
            </div>

            <p className="mt-4 max-w-[40rem] text-center text-sm leading-6 text-text-secondary lg:text-left">
              {t(
                isSubscriptionEnabled
                  ? 'downloadDisclaimerSubscription'
                  : 'downloadDisclaimer',
              )}
            </p>
          </div>
        </div>
      </SiteContainer>

      <SiteContainer as="section" className="pb-20 pt-8 sm:pb-28 sm:pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">
            {t('importGuide.eyebrow')}
          </p>
          <h2 className="mt-3 font-accent text-3xl font-bold tracking-tight sm:text-5xl">
            {t('importGuide.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            {t('importGuide.description')}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {importOptions.map((option) => (
            <article
              key={option.title}
              className="flex h-full flex-col rounded-3xl border border-neutral-400 bg-surface-primary p-6 shadow-sm"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-surface-secondary text-2xl text-brand-primary">
                {option.icon}
              </div>
              <h3 className="mt-5 font-accent text-2xl font-bold">
                {option.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-text-secondary">
                {option.description}
              </p>
              <p className="mt-5 border-t border-neutral-400 pt-4 text-sm leading-6 text-text-primary">
                <span className="font-semibold">
                  {t('importGuide.guideLabel')}
                </span>{' '}
                {option.guide}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-3xl bg-surface-secondary p-6 sm:p-8">
          <h3 className="font-accent text-2xl font-bold">
            {t('importGuide.promptTitle')}
          </h3>
          <p className="mt-3 text-base leading-7 text-text-secondary">
            {t('importGuide.promptDescription')}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {promptIdeas.map((idea) => (
              <p
                key={idea}
                className="rounded-2xl border border-neutral-400 bg-surface-primary p-4 text-sm leading-6 text-text-primary"
              >
                {idea}
              </p>
            ))}
          </div>
        </div>
      </SiteContainer>

      <DownloadAppModal />
    </div>
  )
}

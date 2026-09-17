import AppStoreRating from '@/components/home/AppStoreRating'
import DownloadAppModal from '@/components/home/DownloadAppModal'
import HeroPhone from '@/components/home/HeroPhone'
import AppDownloadButtons from '@/components/shared/AppDownloadButtons'
import SiteContainer from '@/components/layout/SiteContainer'
import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { pageAlternates } from '@/lib/seo'
import { setI18n, setLocale } from '@/serverContexts'
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
    title: t('layout:appTitle'),
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
        <div className="mx-auto -mt-14 w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem] lg:-mt-0 lg:max-w-[20rem] xl:max-w-[22rem]">
          <HeroPhone alt={t('heroAlt')} />
        </div>

        <div className="mx-auto mt-6 w-full max-w-[46rem] text-center lg:mx-0 lg:text-left">
          <AppStoreRating rating={t('appStoreRating')} lovedBy={t('appStoreLovedBy')} />

          <h1 className="font-accent text-[1.3rem] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[1.5rem] lg:text-[2rem] xl:text-[2.5rem]">
            <Trans
              i18n={i18n}
              t={t}
              i18nKey="recipeToTable"
              components={{
                italic: <span className="mr-[0.2em] italic" />,
              }}
            />
          </h1>

          <p className="text mx-auto mt-4 max-w-[42rem] leading-7 text-text-secondary sm:text-xl sm:leading-8 lg:mx-0 lg:text-2xl lg:leading-[1.4]">
            {t('header')}
          </p>

          <div className="mt-6 flex flex-col items-center sm:mt-8 lg:items-start">
            <div className="flex justify-center lg:justify-start">
              <AppDownloadButtons />
            </div>

            <p className="mt-4 max-w-[40rem] text-center text-sm leading-6 text-text-secondary lg:text-left">
              {t('downloadDisclaimer')}
            </p>
          </div>
        </div>
      </SiteContainer>
      <DownloadAppModal />
    </div>
  )
}

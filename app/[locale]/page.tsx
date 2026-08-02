import DownloadAppModal from '@/components/home/DownloadAppModal'
import AppDownloadButtons from '@/components/shared/AppDownloadButtons'
import SiteContainer from '@/components/layout/SiteContainer'
import { isSubscriptionEnabled, LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { setI18n, setLocale } from '@/serverContexts'
import Image from 'next/image'
import { Trans } from 'react-i18next/TransWithoutContext'

const i18nNamespaces = ['home']

type HomeProps = {
  params: Promise<{ locale: LocaleOptions }>
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  const { i18n, t } = await initTranslations(locale, i18nNamespaces)

  setI18n(i18n)
  setLocale(locale)

  return (
    <div className="flex w-full flex-1">
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

      <DownloadAppModal />
    </div>
  )
}

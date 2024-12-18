import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'

const i18nNamespaces = ['home', 'common']

type HomeProps = {
  params: Promise<{ locale: LocaleOptions }>
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, i18nNamespaces)

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <main className="row-start-2 flex flex-grow flex-col items-center gap-8 sm:items-start">
        <div className="flex w-full flex-col divide-y">
          <div className="flex items-center p-6">
            <h1 className="font-accent text-3xl font-bold">{t('header')}</h1>
          </div>
          <div></div>
        </div>
      </main>
    </div>
  )
}

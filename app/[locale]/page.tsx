import BlogSection from '@/components/home/BlogSection'
import DownloadAppModal from '@/components/home/DownloadAppModal'
import FeaturesSection from '@/components/home/FeaturesSection'
import SectionTitle from '@/components/home/SectionTitle'
import SocialSection from '@/components/home/SocialSection'
import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'

const i18nNamespaces = ['home', 'common', 'blog']

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
          <SectionTitle>{t('header')}</SectionTitle>
          <FeaturesSection />
          <BlogSection />
          <SocialSection />
        </div>
        <DownloadAppModal />
      </main>
    </div>
  )
}

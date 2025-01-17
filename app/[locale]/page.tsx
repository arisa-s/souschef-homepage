import BlogSection from '@/components/home/BlogSection'
import DownloadAppModal from '@/components/home/DownloadAppModal'
import FeaturesSection from '@/components/home/FeaturesSection'
import SectionTitle from '@/components/home/SectionTitle'
// import SocialSection from '@/components/home/SocialSection'
import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { setI18n, setLocale } from '@/serverContexts'

const i18nNamespaces = ['home', 'common', 'blog']

type HomeProps = {
  params: Promise<{ locale: LocaleOptions }>
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  const { i18n, t } = await initTranslations(locale, i18nNamespaces)
  setI18n(i18n)
  setLocale(locale)

  return (
    <div className="max-w-8xl mx-auto flex min-h-screen">
      <div className="flex w-full flex-col divide-y">
        <SectionTitle>{t('header')}</SectionTitle>
        <FeaturesSection />
        <BlogSection />
        {/* <SocialSection /> */}
      </div>
      <DownloadAppModal />
    </div>
  )
}

import { KeeperLanding, landingMetadata } from '@/components/home/KeeperLanding'
import { LocaleOptions } from '@/constants'
import i18nConfig from '@/i18nConfig'

type PageProps = { params: Promise<{ locale: LocaleOptions }> }

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  return landingMetadata({ locale, variant: 'free' })
}

export default async function FreeRecipeKeeperAppPage({ params }: PageProps) {
  const { locale } = await params
  return <KeeperLanding locale={locale} variant="free" />
}

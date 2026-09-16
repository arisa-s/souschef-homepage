import { dir } from 'i18next'

import i18nConfig from '@/i18nConfig'
import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'
import { LocaleFonts, getFontStyle } from '@/lib/fonts'

import '../globals.css'
import { setI18n, setLocale } from '@/serverContexts'
import TranslationsProvider from '@/components/locale/TranslationsProvider'
import { Navbar } from '@/components/layout'
import Footer from '@/components/layout/Footer'

const i18nNamespaces = ['home', 'layout', 'common']

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const locale = (await params).locale as LocaleOptions
  const { i18n, resources } = await initTranslations(locale, i18nNamespaces)

  setI18n(i18n)
  setLocale(locale)

  return (
    <html lang={locale} dir={dir(locale)} style={getFontStyle(locale)}>
      <head>
        <LocaleFonts locale={locale} />
      </head>
      <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
        <body
          className={
            locale === 'ja'
              ? 'flex min-h-dvh flex-col overflow-x-clip'
              : 'flex min-h-dvh flex-col overflow-x-clip antialiased'
          }
        >
          <div id="modal-root" />

          <Navbar />

          <main className="flex min-h-0 w-full flex-1 flex-col">{children}</main>

          <Footer />
        </body>
      </TranslationsProvider>
    </html>
  )
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const typedLocale = locale as LocaleOptions
  const { t } = await initTranslations(typedLocale, ['layout'])

  return {
    metadataBase: new URL(SITE_URL),
    title: t('layout:appTitle'),
    description: t('layout:appDescription'),
    itunes: {
      appId: 6468939420,
    },
  }
}

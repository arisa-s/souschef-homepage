import { dir } from "i18next";

import i18nConfig from "@/i18nConfig";
import { LocaleOptions } from "@/constants";
import { Navbar } from "@/components/layout";
import initTranslations from "@/lib/i18n";
import {
  basisGrotesque,
  notoSanJapanese,
  recoleta,
  zenOldMincho,
} from "@/lib/fonts";

import "../globals.css";
import { setI18n } from "@/serverContexts";
import Footer from "@/components/layout/Footer";
import TranslationsProvider from "@/components/locale/TranslationsProvider";

const i18nNamespaces = ["layout", "common"];

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LocaleOptions }>;
}>) {
  const locale = (await params).locale;
  const { i18n, resources } = await initTranslations(locale, i18nNamespaces);
  setI18n(i18n);

  return (
    <html lang={locale} dir={dir(locale)}>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <body
          className={
            locale == "ja"
              ? `${zenOldMincho.variable} ${notoSanJapanese.variable}`
              : `${basisGrotesque.variable} ${recoleta.variable} antialiased`
          }
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </TranslationsProvider>
    </html>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LocaleOptions }>;
}) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["layout"]);
  return {
    title: t("layout:appName"),
    description: t("layout:appDescription"),
    alternates: {
      canonical: "https://www.trysouschef.co",
      languages: {
        en: "https://www.trysouschef.co/en",
        ja: "https://www.trysouschef.co/ja",
      },
    },
  };
}

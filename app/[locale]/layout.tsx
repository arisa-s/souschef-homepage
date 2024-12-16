import type { Metadata } from "next";
import { dir } from "i18next";

import i18nConfig from "@/i18nConfig";
import { LocaleOptions } from "@/constants";
import { Navbar } from "@/components/layout";
import initTranslations from "@/lib/i18n";
import { basisGrotesque, recoleta } from "@/lib/fonts";

import "../globals.css";
import { setI18n } from "@/serverContexts";
import Footer from "@/components/layout/Footer";
import TranslationsProvider from "@/components/locale/TranslationsProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  alternates: {
    canonical: "https://www.trysouschef.co",
    languages: {
      en: "https://www.trysouschef.co/en",
      ja: "https://www.trysouschef.co/ja",
    },
  },
};

const i18nNamespaces = ["layout"];

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
      <body
        className={`${basisGrotesque.variable} ${recoleta.variable} antialiased`}
      >
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <Navbar />
          {children}
        </TranslationsProvider>
        <Footer />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

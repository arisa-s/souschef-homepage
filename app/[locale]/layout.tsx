import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import { LocaleOptions } from "@/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LocaleOptions }>;
}>) {
  const locale = (await params).locale;
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

import { CSSProperties } from 'react'
import { LocaleOptions } from '@/constants'

const ENGLISH_FONT_STYLE = {
  '--font-accent': '"Recoleta", serif',
  '--font-base': '"Basis Grotesque", sans-serif',
} as CSSProperties

const JAPANESE_FONT_STYLE = {
  '--font-accent': '"Zen Old Mincho", serif',
  '--font-base': '"Zen Kaku Gothic New", sans-serif',
} as CSSProperties

const JAPANESE_FONTS_STYLESHEET =
  'https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap'

export function getFontStyle(locale: LocaleOptions) {
  return locale === 'ja' ? JAPANESE_FONT_STYLE : ENGLISH_FONT_STYLE
}

export function LocaleFonts({ locale }: { locale: LocaleOptions }) {
  if (locale === 'ja') {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={JAPANESE_FONTS_STYLESHEET} />
      </>
    )
  }

  return (
    <>
      {/* Locale-specific stylesheet: next/font in the shared layout would ship CJK subsets to English. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/fonts/english.css" />
      <link
        rel="preload"
        href="/fonts/Recoleta/RecoletaBold.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/BasisGrotesque/BasisGrotesque.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
    </>
  )
}

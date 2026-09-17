import type { Metadata } from 'next'

import { DEFAULT_LOCALE } from '@/constants'
import { SITE_URL } from '@/lib/site'

function normalizePath(path = '') {
  if (!path || path === '/') return ''
  return path.startsWith('/') ? path : `/${path}`
}

/** Public URL for a locale. English (default) is unprefixed: `/`, `/blog`. */
export function localePath(locale: string, path = '') {
  const normalized = normalizePath(path)

  if (locale === DEFAULT_LOCALE) {
    return normalized || '/'
  }

  return `/${locale}${normalized}`
}

export function stripLocalePrefix(pathname: string, locale: string) {
  if (pathname === `/${locale}`) return '/'
  if (pathname.startsWith(`/${locale}/`)) {
    return pathname.slice(locale.length + 1)
  }
  return pathname || '/'
}

export function isBlogPath(pathname: string, locale: string) {
  const path = stripLocalePrefix(pathname, locale)
  return path === '/blog' || path.startsWith('/blog/')
}

export function pageAlternates(locale: string, path = '') {
  const en = localePath('en', path)
  const ja = localePath('ja', path)

  return {
    canonical: localePath(locale, path),
    languages: {
      en,
      ja,
      'x-default': en,
    },
  }
}

export function ogLocale(locale: string) {
  return locale === 'ja' ? 'ja_JP' : 'en_US'
}

export function ogAlternateLocale(locale: string) {
  return locale === 'ja' ? 'en_US' : 'ja_JP'
}

export function canonicalUrl(locale: string, path = '') {
  const localized = localePath(locale, path)
  if (localized === '/') return SITE_URL
  return `${SITE_URL}${localized}`
}

const FEED_SHARE_IMAGE = `${SITE_URL}/images/home/hero.webp`
const PUBLISHER_LOGO = `${SITE_URL}/images/mascot.webp`

type BlogIndexMetadataInput = {
  locale: string
  title: string
  description: string
  siteName: string
}

export function blogIndexMetadata({
  locale,
  title,
  description,
  siteName,
}: BlogIndexMetadataInput): Metadata {
  const url = canonicalUrl(locale, '/blog')

  return {
    title,
    description,
    alternates: pageAlternates(locale, '/blog'),
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      locale: ogLocale(locale),
      alternateLocale: [ogAlternateLocale(locale)],
      siteName,
      images: [
        {
          url: FEED_SHARE_IMAGE,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [FEED_SHARE_IMAGE],
    },
  }
}

type BlogPostMetadataInput = {
  locale: string
  slug: string
  title: string
  description: string
  siteName: string
  appTitle: string
  imageUrl?: string | null
  publishedAt: string
  author: string
  tags?: string[] | null
}

export function blogPostMetadata({
  locale,
  slug,
  title,
  description,
  siteName,
  appTitle,
  imageUrl,
  publishedAt,
  author,
  tags,
}: BlogPostMetadataInput): Metadata {
  const url = canonicalUrl(locale, `/blog/${slug}`)
  const images = imageUrl
    ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : undefined

  return {
    title: `${title}: ${appTitle}`,
    description,
    authors: [{ name: author }],
    alternates: pageAlternates(locale, `/blog/${slug}`),
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      locale: ogLocale(locale),
      alternateLocale: [ogAlternateLocale(locale)],
      siteName,
      publishedTime: publishedAt,
      authors: [author],
      tags: tags?.length ? tags : undefined,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

type JsonLd = Record<string, unknown>

const publisher = {
  '@type': 'Organization',
  name: 'Souschef',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: PUBLISHER_LOGO,
  },
}

type BlogCollectionJsonLdInput = {
  locale: string
  title: string
  description: string
  items: Array<{ title: string; slug: string }>
}

export function blogCollectionJsonLd({
  locale,
  title,
  description,
  items,
}: BlogCollectionJsonLdInput): JsonLd {
  const url = canonicalUrl(locale, '/blog')

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Souschef',
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: canonicalUrl(locale, `/blog/${item.slug}`),
        name: item.title,
      })),
    },
  }
}

type BlogPostingJsonLdInput = {
  locale: string
  slug: string
  title: string
  description: string
  imageUrl?: string | null
  publishedAt: string
  updatedAt?: string | null
  author: string
  homeName: string
  blogName: string
}

export function blogPostingJsonLd({
  locale,
  slug,
  title,
  description,
  imageUrl,
  publishedAt,
  updatedAt,
  author,
  homeName,
  blogName,
}: BlogPostingJsonLdInput): JsonLd {
  const url = canonicalUrl(locale, `/blog/${slug}`)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: title,
        description,
        image: imageUrl || undefined,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        inLanguage: locale,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: homeName,
            item: canonicalUrl(locale),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: blogName,
            item: canonicalUrl(locale, '/blog'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: url,
          },
        ],
      },
    ],
  }
}

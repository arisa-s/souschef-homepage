import { type SanityDocument } from 'next-sanity'
import { LocaleOptions } from '@/constants'
import BlogGrid from '@/components/shared/BlogGrid'
import initTranslations from '@/lib/i18n'
import { setI18n } from '@/serverContexts'
import { getPosts } from '@/sanity/lib/repo/post'
import { getImageUrlFor } from '@/sanity/lib/image'
import i18nConfig from '@/i18nConfig'

type BlogProps = { params: Promise<{ locale: LocaleOptions }> }

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function Blog({ params }: BlogProps) {
  const { locale } = await params
  const posts = await getPosts(locale)

  const { i18n, t } = await initTranslations(locale, ['blog'])
  setI18n(i18n)

  const stripBlogpostData = (post: SanityDocument) => ({
    title: post.title,
    slug: post.slug.current,
    image: getImageUrlFor(post.image)?.width(500).height(500).url() || '/images/blog-fallback.png',
    tags: post.tags,
  })

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <main className="w-full items-center divide-y sm:items-start">
        <div className="flex items-center p-6">
          <h1 className="font-accent text-3xl font-medium">{t('pageTitle')}</h1>
        </div>
        <BlogGrid posts={posts.map((p) => stripBlogpostData(p))} />
      </main>
    </div>
  )
}

export async function generateMetadata({ params }: BlogProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['blog', 'layout'])
  return {
    title: t('blog:pageTitle'),
    description: t('blog:pageDescription'),
  }
}

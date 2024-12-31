import { LocaleOptions } from '@/constants'
import BlogGrid from '@/components/shared/BlogGrid'
import initTranslations from '@/lib/i18n'
import { setI18n } from '@/serverContexts'
import { getPosts } from '@/sanity/lib/repo/post'
import i18nConfig from '@/i18nConfig'
import { POSTS_QUERYResult } from '@/sanity.types'
import PageLayout from '@/components/layout/PageLayout'

type BlogProps = { params: Promise<{ locale: LocaleOptions }> }

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function Blog({ params }: BlogProps) {
  const { locale } = await params
  const posts = await getPosts(locale)

  const { i18n, t } = await initTranslations(locale, ['blog'])
  setI18n(i18n)

  const stripBlogpostData = (post: POSTS_QUERYResult[number]) => ({
    title: post.title,
    slug: post.slug,
    image: post.image,
    tags: post.tags,
  })

  return (
    <PageLayout title={t('pageTitle')}>
      <BlogGrid posts={posts.map((p) => stripBlogpostData(p))} />
    </PageLayout>
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

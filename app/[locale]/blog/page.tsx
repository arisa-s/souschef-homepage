import { LocaleOptions } from '@/constants'
import BlogGrid from '@/components/shared/BlogGrid'
import { JsonLd } from '@/components/blog/JsonLd'
import initTranslations from '@/lib/i18n'
import { blogCollectionJsonLd, blogIndexMetadata } from '@/lib/seo'
import { setI18n } from '@/serverContexts'
import { getPosts } from '@/sanity/lib/repo/post'
import i18nConfig from '@/i18nConfig'
import PageLayout from '@/components/layout/PageLayout'

type BlogProps = { params: Promise<{ locale: LocaleOptions }> }

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function Blog({ params }: BlogProps) {
  const { locale } = await params
  const posts = await getPosts(locale)

  const { i18n, t } = await initTranslations(locale, ['blog', 'layout'])
  setI18n(i18n)

  return (
    <>
      <JsonLd
        data={blogCollectionJsonLd({
          locale,
          title: t('pageTitle'),
          description: t('pageDescription'),
          items: posts.map((post) => ({
            title: post.title,
            slug: post.slug.current,
          })),
        })}
      />
      <PageLayout title={t('pageTitle')} description={t('pageIntro')}>
        <BlogGrid posts={posts} />
      </PageLayout>
    </>
  )
}

export async function generateMetadata({ params }: BlogProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['blog', 'layout'])
  return blogIndexMetadata({
    locale,
    title: t('blog:pageTitle'),
    description: t('blog:pageDescription'),
    siteName: t('layout:appName'),
  })
}

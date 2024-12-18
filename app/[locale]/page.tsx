import SocialSection from '@/components/home/SocialSection'
import BlogGrid from '@/components/shared/BlogGrid'
import { LocaleOptions } from '@/constants'
import initTranslations from '@/lib/i18n'
import { getImageUrlFor } from '@/sanity/lib/image'
import { getPosts } from '@/sanity/lib/repo/post'
import { SanityDocument } from 'next-sanity'
import Link from 'next/link'

const i18nNamespaces = ['home', 'common']

type HomeProps = {
  params: Promise<{ locale: LocaleOptions }>
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  const { t } = await initTranslations(locale, i18nNamespaces)
  const posts = await getPosts(locale)

  const stripBlogpostData = (post: SanityDocument) => ({
    title: post.title,
    slug: post.slug.current,
    image: getImageUrlFor(post.image)?.width(500).height(500).url() || '/images/blog-fallback.png',
    tags: post.tags,
  })

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <main className="row-start-2 flex flex-grow flex-col items-center gap-8 sm:items-start">
        <div className="flex w-full flex-col divide-y">
          <div className="flex items-center p-6">
            <h1 className="font-accent text-3xl font-bold">{t('header')}</h1>
          </div>
          <div className="w-full items-center divide-y sm:items-start">
            <div className="flex items-center p-6">
              <h1 className="font-accent text-3xl font-medium">{t('blogSectionTitle')}</h1>
            </div>
            <BlogGrid posts={posts.map((p) => stripBlogpostData(p))} />
            <div className="flex flex-col items-center space-y-6 p-6">
              <Link href="/blog">
                <button className="font-accent text-3xl underline hover:opacity-60">
                  {t('showMoreBlog')}
                </button>
              </Link>

              <p>{t('welcomeNewFeatureIdea')}</p>
            </div>
          </div>
          <div className="w-full items-center divide-y sm:items-start">
            <div className="flex items-center p-6">
              <h1 className="font-accent text-3xl font-medium">{t('socialSectionTitle')}</h1>
            </div>
            <SocialSection />
          </div>
        </div>
      </main>
    </div>
  )
}

import { PortableText } from 'next-sanity'
import { LocaleOptions } from '@/constants'
import { getPost, getPostSlugs } from '@/sanity/lib/repo/post'
import { getImageUrlFor } from '@/sanity/lib/image'
import initTranslations from '@/lib/i18n'
import { blogPostingJsonLd, blogPostMetadata } from '@/lib/seo'
import { estimateReadMinutes, portableTextToPlain } from '@/lib/readingTime'
import { SanityComponents } from '@/sanity/lib/components/SanityComponents'
import BackButton from '@/components/layout/BackButton'
import { HiArrowLongLeft } from 'react-icons/hi2'
import { BlogByline } from '@/components/blog/BlogByline'
import { JsonLd } from '@/components/blog/JsonLd'

type BlogpostProps = {
  params: Promise<{ locale: LocaleOptions; slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPostSlugs()
  return posts.map((post) => ({
    locale: post.language,
    slug: post.slug.current,
  }))
}

export async function generateMetadata({ params }: BlogpostProps) {
  const { locale, slug } = await params
  const post = await getPost(locale, slug)

  if (!post) {
    // todo: redirect to 404
    return null
  }

  const { t } = await initTranslations(locale, ['blog', 'layout'])
  const postImageUrl = post.image ? getImageUrlFor(post.image)?.width(1200).height(630).url() : null
  const tagLabels = post.tags?.map((tag) => t(`blog:${tag}Tag`)).filter(Boolean) ?? []

  return blogPostMetadata({
    locale,
    slug,
    title: post.title,
    description: post.description,
    siteName: t('layout:appName'),
    appTitle: t('layout:appTitle'),
    imageUrl: postImageUrl,
    publishedAt: post.publishedAt,
    author: t('blog:author'),
    tags: tagLabels,
  })
}

export default async function PostPage({ params }: BlogpostProps) {
  const { locale, slug } = await params
  const { t } = await initTranslations(locale, ['blog', 'layout'])
  const post = await getPost(locale, slug)

  if (!post) {
    // todo: redirect to 404
    return null
  }

  const postImageUrl = post.image ? getImageUrlFor(post.image)?.width(1400).url() : null
  const minutes = estimateReadMinutes(portableTextToPlain(post.body), locale)

  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          locale,
          slug,
          title: post.title,
          description: post.description,
          imageUrl: postImageUrl,
          publishedAt: post.publishedAt,
          updatedAt: post._updatedAt,
          author: t('author'),
          homeName: t('layout:appName'),
          blogName: t('pageTitle'),
        })}
      />
      <div className="mx-auto w-full max-w-[680px] px-5 pb-12 pt-3 sm:px-0 sm:pt-6">
        <BackButton className="mb-4 text-2xl text-text-secondary sm:text-3xl">
          <HiArrowLongLeft />
        </BackButton>
        <article className="font-base">
          <header>
            <h1 className="font-base text-2xl font-bold tracking-tight text-text-primary sm:text-3xl sm:leading-tight">
              {post.title}
            </h1>
            {post.summary ? (
              <p className="mt-1.5 font-base text-base leading-7 text-text-secondary sm:mt-2 sm:text-lg sm:leading-8">
                {post.summary}
              </p>
            ) : null}
            <div className="mt-3">
              <BlogByline
                author={t('author')}
                role={t('authorRole')}
                publishedAt={post.publishedAt}
                locale={locale}
                minReadLabel={t('minRead', { count: minutes })}
                size="md"
              />
            </div>
            <hr className="my-4 border-neutral-300" />
          </header>

          {Array.isArray(post.body) ? (
            <PortableText value={post.body} components={SanityComponents} />
          ) : null}
        </article>
      </div>
    </>
  )
}

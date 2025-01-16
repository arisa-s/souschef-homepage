import { PortableText } from 'next-sanity'
import { LocaleOptions } from '@/constants'
import { getPost, getPostSlugs } from '@/sanity/lib/repo/post'
import { decodeAssetId, getImageUrlFor } from '@/sanity/lib/image'
import initTranslations from '@/lib/i18n'
import { SanityComponents } from '@/sanity/lib/components/SanityComponents'
import BackButton from '@/components/layout/BackButton'
import { HiArrowLongLeft } from 'react-icons/hi2'
import Image from 'next/image'

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
  const postImageUrl = post.image ? getImageUrlFor(post.image)?.width(550).height(310).url() : null

  return {
    title: post.title,
    description: post.description,
    image: postImageUrl,
  }
}

export default async function PostPage({ params }: BlogpostProps) {
  const { locale, slug } = await params
  const { t } = await initTranslations(locale, ['blog'])
  const post = await getPost(locale, slug)

  if (!post) {
    // todo: redirect to 404
    return null
  }

  const {
    dimensions: { height, width },
  } = decodeAssetId(post.image.asset!._ref)
  const postImageUrl = post.image
    ? getImageUrlFor(post.image)?.width(width).height(height).url()
    : null

  return (
    <div className="max-w-8xl mx-auto min-h-screen">
      <main className="w-full md:divide-y">
        {/* hero */}
        <div className="flex flex-col-reverse p-6 md:w-full md:flex-row md:divide-x">
          <div className="md:mx-auto md:flex md:w-1/2 md:px-12">
            <div className="space-between flex max-w-md flex-col items-stretch md:mx-auto">
              <BackButton className="hidden md:block md:text-5xl">
                <HiArrowLongLeft />
              </BackButton>
              <div className="mt-6 space-y-4 md:mt-auto">
                <h1 className="font-accent text-2xl font-bold md:-rotate-6 md:pb-6 md:text-4xl">
                  {post.title}
                </h1>
                <p className="hidden md:block md:text-lg">{post.summary}</p>
                <p className="text-text-secondary">
                  {t('published')} {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="m-auto flex w-full md:m-0 md:w-1/2">
            {postImageUrl && (
              <Image
                src={postImageUrl}
                alt={post.title}
                className="w-full md:h-96 md:w-96"
                width={width}
                height={height}
              />
            )}
          </div>
          <BackButton className="mb-2 text-5xl md:hidden">
            <HiArrowLongLeft />
          </BackButton>
        </div>
        <div className="w-full">
          <article className="mx-auto max-w-3xl p-6 md:border-x md:p-12">
            {Array.isArray(post.body) && (
              <PortableText value={post.body} components={SanityComponents} />
            )}
          </article>
        </div>
      </main>
    </div>
  )
}

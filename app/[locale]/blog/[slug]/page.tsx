import { PortableText } from 'next-sanity'
import { LocaleOptions } from '@/constants'
import { getPost, getPostSlugs } from '@/sanity/lib/repo/post'
import { decodeAssetId, getImageUrlFor } from '@/sanity/lib/image'
import initTranslations from '@/lib/i18n'
import { SanityComponents } from '@/sanity/lib/components/SanityComponents'
import BackButton from '@/components/layout/BackButton'
import { HiArrowLongLeft } from 'react-icons/hi2'
import Image from 'next/image'
import ActionButtonGroup from '@/components/blog/ActionButtonGroup'

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
        <div className="flex flex-col-reverse md:w-full md:flex-row md:p-6">
          <div className="md:mx-auto md:flex md:w-1/2 md:px-12">
            <div className="space-between flex max-w-md flex-col items-stretch space-y-6 md:mx-auto">
              <BackButton className="hidden md:block md:text-5xl">
                <HiArrowLongLeft />
              </BackButton>
              <div className="mx-4 space-y-2 md:mt-auto md:space-y-4">
                <h1 className="font-accent text-2xl font-bold md:-rotate-6 md:pb-6 md:text-4xl">
                  {post.title}
                </h1>
                <p className="hidden md:block md:text-lg">{post.summary}</p>
                <div className="flex items-center space-x-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/arisashiraishi.png"
                      alt="author"
                      className="h-12 w-12 rounded-full"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="text-text-secondary">
                    <p className="text-text-secondary">{t('author')} </p>
                    {t('published')} {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-auto flex w-full border-b md:m-0 md:w-1/2 md:border-b-0">
            {postImageUrl && (
              <Image
                src={postImageUrl}
                alt={post.title}
                className="mx-auto h-48 w-48 border-x object-cover md:flex md:h-96 md:w-96 md:border-x-0"
                width={width}
                height={height}
              />
            )}
          </div>
        </div>

        <div className="w-full">
          <article className="mx-auto max-w-3xl p-4 md:border-x md:p-12">
            {Array.isArray(post.body) && (
              <PortableText value={post.body} components={SanityComponents} />
            )}
          </article>
        </div>
        <ActionButtonGroup instagramPostId={post.instagramPostId} />
      </main>
    </div>
  )
}

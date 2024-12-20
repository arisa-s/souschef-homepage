import { PortableText, SanityDocument } from 'next-sanity'
import Link from 'next/link'
import { LocaleOptions } from '@/constants'
import { getPost, getPostSlugs } from '@/sanity/lib/repo/post'
import { getImageUrlFor } from '@/sanity/lib/image'
import initTranslations from '@/lib/i18n'
import { FiArrowLeft } from 'react-icons/fi'

type BlogpostProps = {
  params: Promise<{ locale: LocaleOptions; slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPostSlugs()
  return posts.map((post: SanityDocument) => ({
    locale: post.language,
    slug: post.slug.current,
  }))
}

export async function generateMetadata({ params }: BlogpostProps) {
  const { locale, slug } = await params
  const post = await getPost(locale, slug)
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
  const postImageUrl = post.image ? getImageUrlFor(post.image)?.width(550).height(310).url() : null

  return (
    <div className="mx-auto min-h-screen max-w-7xl">
      <div className="flex items-center p-6">
        <Link href="/blog" className="flex items-center space-x-4 text-3xl hover:underline">
          <FiArrowLeft />
          <h1 className="font-accent font-medium">{t('backToBlog')}</h1>
        </Link>
      </div>
      <main className="container mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-8">
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl"
            width="550"
            height="310"
          />
        )}
        <h1 className="mb-8 text-4xl font-bold">{post.title}</h1>
        <div className="prose">
          <p>
            {t('published')} {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
      </main>
    </div>
  )
}

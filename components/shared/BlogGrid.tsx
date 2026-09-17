import { BlogByline } from '@/components/blog/BlogByline'
import { estimateReadMinutes } from '@/lib/readingTime'
import { getImageUrlFor } from '@/sanity/lib/image'
import { getI18n, getLocale } from '@/serverContexts'
import { BlogPostCard } from '@/types/post'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface BlogGridProps {
  posts: BlogPostCard[]
}

function thumbUrl(post: BlogPostCard, width: number, height: number) {
  return (
    getImageUrlFor(post.image)?.width(width).height(height).url() || '/images/blog-fallback.png'
  )
}

const BlogPostRow: FC<{ post: BlogPostCard; featured?: boolean }> = ({
  post,
  featured = false,
}) => {
  const { t } = getI18n()
  const locale = getLocale()
  const minutes = estimateReadMinutes(post.plainText, locale)
  const Heading = featured ? 'h2' : 'h3'
  const imageUrl = featured ? thumbUrl(post, 1200, 750) : thumbUrl(post, 320, 320)

  return (
    <article>
      <Link
        href={`/blog/${post.slug.current}`}
        className={
          featured
            ? 'group grid grid-cols-[1fr_auto] items-start gap-4 py-6 sm:gap-8 sm:py-8 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:items-center md:gap-10 md:py-4'
            : 'group flex items-start justify-between gap-4 py-6 sm:gap-8 sm:py-8'
        }
      >
        <div className={featured ? 'min-w-0 md:col-start-2 md:row-start-1' : 'min-w-0 flex-1'}>
          <Heading
            className={
              featured
                ? 'text-lg font-bold leading-snug tracking-tight text-text-primary sm:text-2xl md:leading-tight'
                : 'text-lg font-bold leading-snug tracking-tight text-text-primary sm:text-2xl'
            }
          >
            {post.title}
          </Heading>
          {post.summary ? (
            <p
              className={
                featured
                  ? 'mt-1 line-clamp-2 text-sm leading-6 text-text-secondary sm:mt-2 sm:text-base md:mt-3 md:line-clamp-none md:text-lg md:leading-7'
                  : 'mt-1 line-clamp-2 text-sm leading-6 text-text-secondary sm:mt-2 sm:text-base'
              }
            >
              {post.summary}
            </p>
          ) : null}
          <div className={featured ? 'mt-3 sm:mt-4 md:mt-6' : 'mt-3 sm:mt-4'}>
            <BlogByline
              author={t('author')}
              role={t('authorRole')}
              publishedAt={post.publishedAt}
              locale={locale}
              minReadLabel={t('minRead', { count: minutes })}
              size={featured ? 'md' : 'sm'}
            />
          </div>
        </div>
        <div
          className={
            featured
              ? 'relative size-[72px] shrink-0 overflow-hidden rounded sm:size-[112px] md:col-start-1 md:row-start-1 md:aspect-[16/10] md:size-auto md:w-full md:rounded-none'
              : 'relative size-[72px] shrink-0 overflow-hidden rounded sm:size-[112px]'
          }
        >
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority={featured}
            sizes={featured ? '(min-width: 768px) 352px, 112px' : '(min-width: 640px) 112px, 72px'}
            className="object-cover"
          />
        </div>
      </Link>
    </article>
  )
}

export const BlogGrid: FC<BlogGridProps> = ({ posts }) => {
  if (posts.length === 0) return null

  const [featured, ...rest] = posts

  return (
    <div className="flex flex-col">
      <div className="border-b border-neutral-300 md:pb-8">
        <BlogPostRow post={featured} featured />
      </div>
      <div className="mx-auto w-full max-w-3xl">
        {rest.map((post) => (
          <div key={post._id} className="border-b border-neutral-300 last:border-b-0">
            <BlogPostRow post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogGrid

import { BlogByline } from '@/components/blog/BlogByline'
import { estimateReadMinutes } from '@/lib/readingTime'
import { getI18n, getLocale } from '@/serverContexts'
import { BlogPostCard } from '@/types/post'
import Link from 'next/link'
import { FC } from 'react'

export interface BlogGridProps {
  posts: BlogPostCard[]
}

const BlogPostRow: FC<{ post: BlogPostCard; featured?: boolean }> = ({
  post,
  featured = false,
}) => {
  const { t } = getI18n()
  const locale = getLocale()
  const minutes = estimateReadMinutes(post.plainText, locale)
  const Heading = featured ? 'h2' : 'h3'

  return (
    <article>
      <Link href={`/blog/${post.slug.current}`} className="block py-6 sm:py-8">
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
      </Link>
    </article>
  )
}

export const BlogGrid: FC<BlogGridProps> = ({ posts }) => {
  if (posts.length === 0) return null

  const [featured, ...rest] = posts

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <div className="border-b border-neutral-300">
        <BlogPostRow post={featured} featured />
      </div>
      {rest.map((post) => (
        <div key={post._id} className="border-b border-neutral-300 last:border-b-0">
          <BlogPostRow post={post} />
        </div>
      ))}
    </div>
  )
}

export default BlogGrid

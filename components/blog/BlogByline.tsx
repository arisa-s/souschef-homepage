import Image from 'next/image'

export const BLOG_AUTHOR_AVATAR = '/arisashiraishi.png'

type BlogBylineProps = {
  author: string
  role: string
  publishedAt: string
  locale: string
  minReadLabel: string
  size?: 'sm' | 'md'
}

export function formatBlogDate(publishedAt: string, locale: string) {
  return new Date(publishedAt).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  })
}

export function BlogByline({
  author,
  role,
  publishedAt,
  locale,
  minReadLabel,
  size = 'sm',
}: BlogBylineProps) {
  const avatarSize = size === 'md' ? 36 : 24
  const dateLabel = formatBlogDate(publishedAt, locale)
  const metaClass = size === 'md' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'

  return (
    <div className="flex items-center gap-2 text-text-secondary">
      <Image
        src={BLOG_AUTHOR_AVATAR}
        alt={author}
        width={avatarSize}
        height={avatarSize}
        className="rounded-full object-cover"
      />
      <div className={metaClass}>
        <p className="text-text-primary">{author}</p>
        <p>
          <span>{role}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={publishedAt}>{dateLabel}</time>
          <span aria-hidden="true"> · </span>
          <span>{minReadLabel}</span>
        </p>
      </div>
    </div>
  )
}

import { getI18n } from '@/serverContexts'
import { BlogPostCard, BlogType } from '@/types/post'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface BlogGridProps {
  posts: BlogPostCard[]
}

export const BlogGrid: FC<BlogGridProps> = ({ posts }) => {
  const totalPosts = posts.length
  const lastRowIndexStart = totalPosts - (totalPosts % 3 || 3)
  const { t } = getI18n()

  return (
    <div className="sm:px-40">
      <div className="flex flex-col divide-y sm:grid sm:grid-cols-3 sm:divide-y-0">
        {posts.map((post, index) => {
          const isFirstColumn = index % 3 === 0
          const isLastRow = index >= lastRowIndexStart
          const borderClass = `${isFirstColumn ? 'sm:border-l' : ''} sm:border-r ${
            isLastRow ? '' : 'sm:border-b'
          }`

          return (
            <Link href={`/blog/${post.slug}`} key={index}>
              <div
                className={`flex cursor-pointer flex-row p-4 hover:bg-surface-hover sm:flex-col sm:space-x-0 sm:space-x-4 sm:space-y-4 sm:p-6 ${borderClass}`}
              >
                <div className="hidden sm:block">
                  {post.tags?.map((tag: BlogType, index: number) => (
                    <p className="text-secondary font-accent uppercase" key={index}>
                      {t(`${tag}Tag`)}
                    </p>
                  ))}
                </div>

                <div className="mr-6 w-1/3 sm:mr-0 sm:w-auto">
                  <Image
                    src={post.image || '/images/blog-fallback.png'}
                    alt={`${post.title} head image`}
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="sm:hidden">
                    {post.tags?.map((tag: BlogType, index: number) => (
                      <p className="text-secondary font-accent uppercase" key={index}>
                        {t(`${tag}Tag`)}
                      </p>
                    ))}
                  </div>

                  <label className="text-lg font-medium capitalize sm:text-base">
                    {post.title}
                  </label>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BlogGrid

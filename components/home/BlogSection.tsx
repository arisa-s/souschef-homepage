import SectionTitle from './SectionTitle'
import Link from 'next/link'
import { getPosts } from '@/sanity/lib/repo/post'
import { getI18n, getLocale } from '@/serverContexts'
import { decodeAssetId, getImageUrlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import AppDowloadQR from '../shared/AppDownloadQR'
import Marquee from 'react-fast-marquee'
import { onelinkLink } from '@/constants'
import { POSTS_QUERYResult } from '@/sanity.types'

export const BlogSection = async ({}) => {
  const { t } = getI18n()
  const locale = getLocale()
  const posts = await getPosts(locale)
  const newFeaturePost = posts.filter((post) => post.tags?.includes('newFeature'))[0]
  const otherPosts = posts.filter((post) => post._id !== newFeaturePost._id)

  const {
    dimensions: { height: newFeaturePostImageHeight, width: newFeaturePostImageWidth },
  } = decodeAssetId(newFeaturePost.image.asset!._ref)

  const newFeaturePostImage = getImageUrlFor(newFeaturePost.image)
    ?.width(newFeaturePostImageWidth)
    .height(newFeaturePostImageHeight)
    .url()

  return (
    <div className="flex-col">
      <Marquee
        autoFill
        className="w-full bg-surface-component py-2 text-lg font-medium text-text-invert"
      >
        <p className="px-4 text-sm sm:text-lg">
          {t('newFeatureSectionTitle')}: {newFeaturePost.title}
        </p>
      </Marquee>
      <div className="mx-auto flex max-w-7xl flex-col divide-y sm:flex-row sm:divide-x sm:divide-y-0 sm:border-x">
        <div className="w-full flex-col divide-y sm:w-1/2">
          <SectionTitle>{t('newFeatureSectionTitle')}</SectionTitle>
          <div className="space-y-6">
            <div className="border-b px-12 sm:px-36">
              <div className="flex flex-col items-center justify-center border-x">
                <Image
                  width={newFeaturePostImageWidth}
                  height={newFeaturePostImageHeight}
                  src={newFeaturePostImage}
                  alt="Shopping list gif"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 px-6 pb-6">
              <h2 className="flex items-center text-xl font-bold sm:text-3xl">
                {newFeaturePost.title}
              </h2>
              <p className="sm:text-lg">{newFeaturePost.summary}</p>
              <Link
                href={`/blog/${newFeaturePost.slug.current}`}
                className="ml-auto text-lg underline hover:opacity-60"
              >
                {t('common:learnMore')}
              </Link>
            </div>
          </div>
          <SectionTitle>{t('qrCodeDownloadTitle')}</SectionTitle>
          <div className="px-20">
            <div className="flex flex-col items-center justify-center space-y-12 border-x py-20">
              <AppDowloadQR width={160} />
              <Link href={onelinkLink}>
                <button className="bg-surface-component px-6 py-2 text-lg font-bold text-text-invert hover:opacity-60">
                  {t('downloadNow')}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex-col divide-y sm:w-1/2">
          <SectionTitle>{t('blogSectionTitle')}</SectionTitle>
          {otherPosts.slice(0, 6).map(
            (
              post // Limit to the first 6 posts
            ) => (
              <BlogListItem post={post} key={post._id} />
            )
          )}
          <div className="flex flex-col items-center space-y-6 p-6 text-center">
            <Link href="/blog">
              <button className="font-accent text-xl underline hover:opacity-60 sm:text-3xl">
                {t('showMoreBlog')}
              </button>
            </Link>
            <p className="text-secondary sm:text-lg">
              {t('welcomeNewFeatureIdea')}
              <br />
              {t('dropUsLine')}{' '}
              <a className="font-medium text-blue-500" href="mailto:team@nekonote.co">
                team@nekonote.co
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogListItem = ({ post }: { post: POSTS_QUERYResult[number] }) => {
  const {
    dimensions: { height, width },
  } = decodeAssetId(post.image.asset!._ref)
  const { t } = getI18n()

  const imgUrl = getImageUrlFor(post.image)?.width(width).height(height).url()

  return (
    <div className="hover:bg-surface-hover">
      <Link href={`/blog/${post.slug.current}`}>
        <div className={`flex space-x-6 p-6 sm:space-x-12`}>
          <Image
            src={imgUrl}
            alt={`${post.title} head image`}
            width={width}
            height={height}
            className="w-24"
          />
          <div className="my-auto">
            {post.tags?.map((tag, index) => (
              <p className="text-secondary font-accent uppercase" key={index}>
                {t(`blog:${tag}Tag`)}
              </p>
            ))}
            <h3 className="text-xl font-medium capitalize sm:text-2xl">{post.title}</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogSection

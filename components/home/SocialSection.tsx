// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import { FC, useEffect } from 'react'
import SectionTitle from './SectionTitle'
import { useTranslation } from 'react-i18next'

export interface InstagramEmbedProps {
  link: string
}

const EMBED_MAX_WIDTH = 260

const InstagramEmbed: FC<InstagramEmbedProps> = ({ link }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // Ensure Instagram embeds are processed
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }

    return () => {
      // Clean up dynamically added script
      document.body.removeChild(script)
    }
  }, [])

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={`${link}/?utm_source=ig_embed&amp;utm_campaign=loading`}
      data-instgrm-version="14"
      data-width={EMBED_MAX_WIDTH}
      style={{
        background: '#FFF',
        border: '0',
        borderRadius: '3px',
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
        margin: '0 auto',
        maxWidth: '100%',
        minWidth: 0,
        padding: '0',
        width: EMBED_MAX_WIDTH,
      }}
    >
      <a
        href={`${link}/?utm_source=ig_embed&amp;utm_campaign=loading`}
        target="_blank"
        rel="noreferrer"
      >
        View this post on Instagram
      </a>
    </blockquote>
  )
}

export const SocialSection: FC = () => {
  const slidePosts = [
    {
      url: 'https://www.instagram.com/reel/C3rRDmpMXBK',
    },
    {
      url: 'https://www.instagram.com/reel/C30JnMrrcFy',
    },
  ]
  const { t } = useTranslation()

  return (
    <div className="w-full items-center divide-y sm:items-start">
      <SectionTitle>{t('socialSectionTitle')}</SectionTitle>
      <div>
        <div className="sm:mx-24 sm:border-x">
          <div className="sm:mx-24 sm:border-x">
            <div className="flex flex-col sm:flex-row sm:divide-x">
              {slidePosts.map((post, index) => (
                <div
                  className="flex w-full min-w-0 justify-center p-4 sm:w-1/2 sm:p-6"
                  key={index}
                >
                  <div className="min-w-0 overflow-hidden [&_.instagram-media]:!min-w-0 [&_.instagram-media]:!max-w-full [&_iframe]:!max-w-full">
                    <InstagramEmbed link={post.url} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialSection

'use client'
import { InstagramEmbed } from 'react-social-media-embed'

const EMBED_MAX_WIDTH = 260

export const InstagramPreview = ({ value }: { value: { url: string } }) => {
  const { url } = value
  if (!url) {
    return null
  }
  return (
    <div
      className="instagram-preview mx-auto my-4 w-full min-w-0 max-w-[260px] overflow-hidden [&_.instagram-media]:!min-w-0 [&_.instagram-media]:!max-w-full [&_.rsme-embed]:!w-full [&_iframe]:!max-w-full"
      style={{ maxWidth: EMBED_MAX_WIDTH }}
    >
      <InstagramEmbed url={url} width={EMBED_MAX_WIDTH} style={{ maxWidth: '100%' }} />
    </div>
  )
}

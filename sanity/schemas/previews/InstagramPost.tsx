'use client'
import { InstagramEmbed } from 'react-social-media-embed'

export const InstagramPreview = ({ value }: { value: { url: string } }) => {
  const { url } = value
  if (!url) {
    return null
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <InstagramEmbed url={url} />
    </div>
  )
}

import { LocaleOptions } from '@/constants'
import { sanityClient } from '../client'
import { defineQuery } from 'next-sanity'

const LATEST_TOC_QUERY = defineQuery(
  `*[_type == 'toc' && language == $language] | order(_publishedAt desc) [0]`
)
export const getLatestToc = async (language: LocaleOptions) => {
  const toc = await sanityClient.fetch(LATEST_TOC_QUERY, {
    language,
  })
  return toc
}

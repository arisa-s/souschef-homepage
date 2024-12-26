import { LocaleOptions } from '@/constants'
import { sanityClient } from '../client'
import { defineQuery } from 'next-sanity'

const LATEST_PRIVACY_QUERY = defineQuery(
  `*[_type == 'privacy' && language == $language] | order(_publishedAt desc) [0]`
)
export const getLatestPrivacy = async (language: LocaleOptions) => {
  const privacy = await sanityClient.fetch(LATEST_PRIVACY_QUERY, {
    language,
  })
  return privacy
}

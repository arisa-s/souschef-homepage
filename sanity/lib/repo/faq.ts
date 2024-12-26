import { LocaleOptions } from '@/constants'
import { defineQuery } from 'next-sanity'
import { sanityClient } from '../client'

const FAQS_QUERY = defineQuery(
  `*[
        _type == 'faq'
        && language == $language
        && defined(question)
        && defined(answer)
    ] | order(order asc) {
        _id, question, answer
    }`
)

export const getFaqs = async (language: LocaleOptions) => {
  const faqs = await sanityClient.fetch(FAQS_QUERY, {
    language,
  })
  return faqs
}

import { blogpostType, faqType, privacyType, tocType } from './documents'
import { instagramObject } from './objects'

export const schema = {
  name: 'default',
  types: [blogpostType, faqType, privacyType, tocType, instagramObject],
}

export default schema

import {defineField, defineType, SlugValidationContext} from 'sanity'

export const blogpostType = defineType({
  name: 'blogpost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Japanese', value: 'ja'}
        ],
      },
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        isUnique: isUniqueOtherThanLanguage
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Description (SEO)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: [
            {title: 'How To', value: 'howTo'},
            {title: 'New Feature', value: 'newFeature'}
          ],
        },
      }],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})

export async function isUniqueOtherThanLanguage(slug: string, context: SlugValidationContext) {
  const {document, getClient} = context
  if (!document?.language) {
    return true
  }
  const client = getClient({apiVersion: '2023-04-24'})
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    language: document.language,
    slug,
  }
  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`
  const result = await client.fetch(query, params)
  return result
}
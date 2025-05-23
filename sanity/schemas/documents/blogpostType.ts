import { defineField, defineType, SlugValidationContext } from 'sanity'

export const blogpostType = defineType({
  name: 'blogpost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Japanese', value: 'ja' },
        ],
      },
      validation: (rule) => rule.required(),
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
        isUnique: isUniqueOtherThanLanguage,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (SEO)',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'instagramPost' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            { name: 'alt', title: 'Alt Description', type: 'string' },
            {
              name: 'maxWidth',
              title: 'Max Width',
              description: 'The maximum width of the image in pixels',
              type: 'number',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'How To', value: 'howTo' },
              { title: 'New Feature', value: 'newFeature' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instagramPostId',
      type: 'string',
    }),
  ],
})

export async function isUniqueOtherThanLanguage(slug: string, context: SlugValidationContext) {
  const { document, getClient } = context
  if (!document?.language) {
    return true
  }
  const client = getClient({ apiVersion: '2023-04-24' })
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

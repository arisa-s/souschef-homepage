import { defineField, defineType } from 'sanity'

export const tocType = defineType({
  name: 'toc',
  title: 'Terms of Condition',
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
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'publishedAt',
    },
  },
})

import { InstagramPreview } from '../previews'

export const instagramObject = {
  type: 'object',
  name: 'instagramPost',
  title: 'Instagram Post',
  fields: [
    {
      name: 'url',
      type: 'url',
      description: 'Visit an Instagram post in a browser and copy the URL',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    component: InstagramPreview,
  },
}

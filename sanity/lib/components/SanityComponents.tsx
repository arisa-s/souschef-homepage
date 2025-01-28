import { InstagramPreview } from '@/sanity/schemas/previews'
import { PortableTextReactComponents } from 'next-sanity'
import Link from 'next/link'
import { getImageUrlFor } from '../image'

export const SanityComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ children, value }) => (
      <Link href={value.href} className="underline">
        {children}
      </Link>
    ),
  },
  block: {
    normal: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <p className="text-primary mb-3 leading-8 tracking-wide md:text-xl">{children}</p>
      ),
    h1: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h1 className="text-primary mb-4 text-3xl font-bold md:mb-5 md:text-5xl">{children}</h1>
      ),
    h2: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h2 className="text-primary mb-3 text-2xl font-bold md:mb-4 md:text-4xl">{children}</h2>
      ),
    h3: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h3 className="text-primary mb-3 text-xl font-semibold md:mb-4 md:text-3xl">{children}</h3>
      ),
    h4: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h4 className="text-primary mb-2 text-lg font-medium md:mb-3 md:text-2xl">{children}</h4>
      ),
    h5: ({ children }) =>
      children == '' ? <br /> : <h5 className="text-primary font-medium md:text-xl">{children}</h5>,
    h6: ({ children }) =>
      children == '' ? <br /> : <h6 className="text-primary text-sm md:text-lg">{children}</h6>,
    blockquote: ({ children }) =>
      children == '' ? <br /> : <blockquote className="italic">{children}</blockquote>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="list-inside list-disc space-y-4 pb-4">{children}</ul>,
    number: ({ children }) => (
      <ol className="ml-4 list-outside list-decimal space-y-4 pb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="list md:text-xl">{children}</li>,
    number: ({ children }) => <li className="list pl-2 md:pl-4 md:text-xl">{children}</li>,
  },
  // Add the 'types' property to handle custom object types like 'instagram'
  types: {
    instagramPost: ({ value }) => <InstagramPreview value={value} />,
    image: ({ value }) => {
      const imageUrl = getImageUrlFor(value)?.url()
      return <img src={imageUrl} />
    },
  },
}

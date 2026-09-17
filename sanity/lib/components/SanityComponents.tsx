import { InstagramPreview } from '@/sanity/schemas/previews'
import { PortableTextReactComponents } from 'next-sanity'
import Link from 'next/link'
import { getImageUrlFor } from '../image'

const bodyClassName =
  'font-base mb-3 text-base leading-7 text-text-primary md:mb-3.5 md:text-[1.05rem] md:leading-8'
const headingClassName = 'font-base mb-1.5 mt-5 font-bold tracking-tight text-text-primary first:mt-0'
const listItemClassName =
  'font-base list leading-7 text-base text-text-primary md:text-[1.05rem] md:leading-8'

export const SanityComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ children, value }) => (
      <Link href={value.href} className="underline underline-offset-2">
        {children}
      </Link>
    ),
  },
  block: {
    normal: ({ children }) =>
      children == '' ? <br /> : <p className={bodyClassName}>{children}</p>,
    h1: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h2 className={`${headingClassName} mb-2 text-2xl md:text-3xl`}>{children}</h2>
      ),
    h2: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h2 className={`${headingClassName} text-xl md:text-2xl`}>{children}</h2>
      ),
    h3: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h3 className={`${headingClassName} text-lg md:text-xl`}>{children}</h3>
      ),
    h4: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h4 className={`${headingClassName} text-base font-semibold md:text-lg`}>{children}</h4>
      ),
    h5: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h5 className={`${headingClassName} text-sm font-semibold md:text-base`}>{children}</h5>
      ),
    h6: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <h6 className={`${headingClassName} text-sm font-semibold`}>{children}</h6>
      ),
    blockquote: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <blockquote className="font-base my-3 border-l-2 border-neutral-400 pl-4 text-base italic leading-7 text-text-secondary md:text-[1.05rem] md:leading-8">
          {children}
        </blockquote>
      ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-inside list-disc space-y-1.5 py-2">{children}</ul>,
    number: ({ children }) => (
      <ol className="ml-4 list-outside list-decimal space-y-1.5 py-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className={listItemClassName}>{children}</li>,
    number: ({ children }) => <li className={`${listItemClassName} pl-2 md:pl-4`}>{children}</li>,
  },
  types: {
    instagramPost: ({ value }) => <InstagramPreview value={value} />,
    image: ({ value }) => {
      const imageUrl = getImageUrlFor(value)?.url()
      if (!imageUrl) return null
      const maxWidth = value.maxWidth
      const alt = typeof value.alt === 'string' ? value.alt : ''
      return (
        <img
          src={imageUrl}
          alt={alt}
          className="my-3"
          style={{
            maxWidth: maxWidth ? `${maxWidth}px` : '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      )
    },
  },
}

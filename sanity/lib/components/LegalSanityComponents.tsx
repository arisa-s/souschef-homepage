import { PortableTextReactComponents } from 'next-sanity'
import Link from 'next/link'
import { getImageUrlFor } from '../image'

const bodyClassName =
  'mb-5 font-base text-base leading-7 tracking-normal text-text-primary sm:text-[1.05rem] sm:leading-8'
const sectionHeadingClassName =
  'mb-5 mt-12 font-base text-sm font-bold uppercase tracking-[0.1em] text-text-primary sm:text-base'
const subheadingClassName =
  'mb-3 mt-8 font-base text-base font-semibold text-text-primary sm:text-lg'
const listClassName = 'mb-5 list-disc space-y-3 py-1 pl-5'
const listItemClassName =
  'font-base text-base leading-7 text-text-primary sm:text-[1.05rem] sm:leading-8'

export const LegalSanityComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ children, value }) => (
      <Link href={value.href} className="underline underline-offset-2">
        {children}
      </Link>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
  },
  block: {
    normal: ({ children }) =>
      children == '' ? (
        <br />
      ) : (
        <p className={bodyClassName}>{children}</p>
      ),
    h1: ({ children }) =>
      children == '' ? null : <h2 className={sectionHeadingClassName}>{children}</h2>,
    h2: ({ children }) =>
      children == '' ? null : <h2 className={sectionHeadingClassName}>{children}</h2>,
    h3: ({ children }) =>
      children == '' ? null : <h3 className={subheadingClassName}>{children}</h3>,
    h4: ({ children }) =>
      children == '' ? null : (
        <h4 className="mb-3 mt-6 font-base text-base font-medium text-text-primary">{children}</h4>
      ),
    blockquote: ({ children }) =>
      children == '' ? null : <blockquote className="italic">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className={listClassName}>{children}</ul>,
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-3 py-1 pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className={listItemClassName}>{children}</li>,
    number: ({ children }) => <li className={listItemClassName}>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = getImageUrlFor(value)?.url()
      const maxWidth = value.maxWidth
      return (
        <img
          src={imageUrl}
          alt=""
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

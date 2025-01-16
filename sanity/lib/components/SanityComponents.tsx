import { PortableTextReactComponents } from 'next-sanity'
import Link from 'next/link'

export const SanityComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ children, value }) => (
      <Link href={value.href} className="underline">
        {children}
      </Link>
    ),
  },
  block: {
    normal: ({ children }) => <p className="py-1 md:text-xl">{children}</p>,
    h1: ({ children }) => <h1 className="text-3xl md:text-5xl">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-4xl">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-3xl">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg md:text-2xl">{children}</h4>,
    h5: ({ children }) => <h5 className="md:text-xl">{children}</h5>,
    h6: ({ children }) => <h6 className="text-sm md:text-lg">{children}</h6>,
    list: ({ children }) => <ul className="list-disc space-y-4 pl-5 md:pl-8">{children}</ul>,
    listItem: ({ children }) => <li className="md:text-xl">{children}</li>,
    blockquote: ({ children }) => <blockquote className="italic">{children}</blockquote>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="list-inside list-disc space-y-4">{children}</ul>,
    number: ({ children }) => <ol className="list-inside list-decimal space-y-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="list md:text-xl">{children}</li>,
  },
}

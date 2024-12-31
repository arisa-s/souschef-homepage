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
    normal: ({ children }) => <p className="md:text-xl">{children}</p>,
    h1: ({ children }) => <h1 className="font-accent text-3xl md:text-5xl">{children}</h1>,
    h2: ({ children }) => <h2 className="font-accent text-2xl md:text-4xl">{children}</h2>,
    h3: ({ children }) => <h3 className="font-accent text-xl md:text-3xl">{children}</h3>,
    h4: ({ children }) => <h4 className="font-accent text-lg md:text-2xl">{children}</h4>,
    h5: ({ children }) => <h5 className="font-accent md:text-xl">{children}</h5>,
    h6: ({ children }) => <h6 className="font-accent text-sm md:text-lg">{children}</h6>,
    list: ({ children }) => <ul className="list-disc space-y-4 pl-5 md:pl-8">{children}</ul>,
    listItem: ({ children }) => <li className="md:text-xl">{children}</li>,
    blockquote: ({ children }) => <blockquote className="italic">{children}</blockquote>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
    number: ({ children }) => <ol className="mt-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="md:text-xl">{children}</li>,
  },
}

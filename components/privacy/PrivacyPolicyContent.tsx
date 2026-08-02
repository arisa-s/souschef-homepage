import Link from 'next/link'
import type { ReactNode } from 'react'

type PrivacyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'orderedList'; items: string[] }

type PrivacySection = {
  title: string
  blocks: PrivacyBlock[]
}

type PrivacyPolicyContentProps = {
  intro: string[]
  sections: PrivacySection[]
}

const bodyClassName =
  'mb-5 font-base text-base leading-7 tracking-normal text-text-primary sm:text-[1.05rem] sm:leading-8'
const sectionHeadingClassName =
  'mb-5 font-base text-sm font-bold uppercase tracking-[0.1em] text-text-primary sm:text-base'
const subheadingClassName =
  'mb-3 mt-8 font-base text-base font-semibold text-text-primary sm:text-lg'
const listClassName = 'mb-5 list-disc space-y-3 py-1 pl-5'
const listItemClassName =
  'font-base text-base leading-7 text-text-primary sm:text-[1.05rem] sm:leading-8'

function displaySectionTitle(title: string) {
  return title.replace(/^\d+\.\s*/, '')
}

function renderRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        nodes.push(
          <Link key={key++} href={href} className="underline underline-offset-2">
            {label}
          </Link>
        )
      }
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

export function PrivacyPolicyContent({ intro, sections }: PrivacyPolicyContentProps) {
  return (
    <article className="legal-document">
      {intro.map((paragraph) => (
        <p key={paragraph} className={bodyClassName}>
          {renderRichText(paragraph)}
        </p>
      ))}
      {sections.map((section) => (
        <section key={section.title} className="mt-12">
          <h2 className={sectionHeadingClassName}>{displaySectionTitle(section.title)}</h2>
          {section.blocks.map((block, index) => {
            if (block.type === 'heading') {
              return (
                <h3 key={`${section.title}-heading-${index}`} className={subheadingClassName}>
                  {block.text}
                </h3>
              )
            }

            if (block.type === 'list') {
              return (
                <ul key={`${section.title}-list-${index}`} className={listClassName}>
                  {block.items.map((item) => (
                    <li key={item} className={listItemClassName}>
                      {renderRichText(item)}
                    </li>
                  ))}
                </ul>
              )
            }

            if (block.type === 'orderedList') {
              return (
                <ol
                  key={`${section.title}-ordered-list-${index}`}
                  className="mb-5 list-decimal space-y-3 py-1 pl-5"
                >
                  {block.items.map((item) => (
                    <li key={item} className={listItemClassName}>
                      {renderRichText(item)}
                    </li>
                  ))}
                </ol>
              )
            }

            return (
              <p key={`${section.title}-paragraph-${index}`} className={bodyClassName}>
                {renderRichText(block.text)}
              </p>
            )
          })}
        </section>
      ))}
    </article>
  )
}

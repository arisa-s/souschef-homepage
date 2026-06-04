type PrivacySection = {
  title: string
  paragraphs?: string[]
  listItems?: string[]
}

type PrivacyPolicyContentProps = {
  intro: string
  sections: PrivacySection[]
}

export function PrivacyPolicyContent({ intro, sections }: PrivacyPolicyContentProps) {
  return (
    <article>
      <p className="text-primary mb-5 leading-8 tracking-wide md:mb-6 md:text-xl md:leading-9">
        {intro}
      </p>
      {sections.map((section) => (
        <section key={section.title} className="mb-2">
          <h2 className="text-primary mb-3 text-2xl font-bold md:mb-4 md:text-4xl">{section.title}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph}
              className="text-primary mb-5 leading-8 tracking-wide md:mb-6 md:text-xl md:leading-9"
            >
              {paragraph}
            </p>
          ))}
          {section.listItems && section.listItems.length > 0 && (
            <ul className="list-inside list-disc space-y-4 py-4">
              {section.listItems.map((item) => (
                <li key={item} className="list leading-8 md:text-xl md:leading-9">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  )
}

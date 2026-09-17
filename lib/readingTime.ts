const EN_WORDS_PER_MINUTE = 230
const JA_CHARS_PER_MINUTE = 500

export function portableTextToPlain(body: unknown): string {
  if (!Array.isArray(body)) return ''

  return body
    .map((block) => {
      if (!block || typeof block !== 'object') return ''
      const children = (block as { children?: Array<{ text?: string }> }).children
      if (!Array.isArray(children)) return ''
      return children.map((child) => child.text ?? '').join('')
    })
    .join('\n')
}

export function estimateReadMinutes(text: string | null | undefined, locale: string): number {
  const trimmed = text?.trim() ?? ''
  if (!trimmed) return 1

  if (locale === 'ja') {
    const chars = trimmed.replace(/\s+/g, '').length
    return Math.max(1, Math.round(chars / JA_CHARS_PER_MINUTE))
  }

  const words = trimmed.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / EN_WORDS_PER_MINUTE))
}

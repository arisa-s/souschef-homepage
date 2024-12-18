import i18nConfig from '@/i18nConfig'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

// Disable automatic body parsing to prevent signature validation issues
export const config = {
  api: {
    bodyParser: false,
  },
}

const secret = process.env.SANITY_REVALIDATE_SECRET

export default async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const signature = req.headers[SIGNATURE_HEADER_NAME] as string | undefined
  const body = await readBody(req)

  if (!signature || !isValidSignature(body, signature, secret!)) {
    return res.status(401).json({ message: 'Invalid signature' })
  }

  try {
    const { _type: type, slug } = JSON.parse(body)

    if (type === 'blogpost' && slug?.current) {
      const urlsToRevalidate = i18nConfig.locales.flatMap((locale) => [
        `/${locale}/blog/${slug.current}`,
        `/${locale}/blog`,
        `/${locale}`,
      ])

      await Promise.all(
        urlsToRevalidate.map(async (url) => {
          try {
            await res.revalidate(url)
          } catch (err) {
            console.error(`Failed to revalidate ${url}:`, err)
          }
        })
      )

      return res.json({ message: `Revalidated "${type}" with slug "${slug.current}"` })
    }

    return res.status(400).json({ message: 'Unsupported or missing type' })
  } catch (err) {
    console.error('Error revalidating:', err)
    return res.status(500).json({ message: `Error revalidating: ${err}` })
  }
}

async function readBody(req: NextApiRequest): Promise<string> {
  const chunks: Uint8Array[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

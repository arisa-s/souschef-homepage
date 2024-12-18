import i18nConfig from '@/i18nConfig'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  api: {
    bodyParser: false,
  },
}

const secret = process.env.SANITY_REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
  }

  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? undefined
  const body = await req.text()

  if (!signature || !isValidSignature(body, signature, secret!)) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
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
            await revalidatePath(url)
          } catch (err) {
            console.error(`Failed to revalidate ${url}:`, err)
          }
        })
      )

      return NextResponse.json({ message: `Revalidated "${type}" with slug "${slug.current}"` })
    }

    return NextResponse.json({ message: 'Unsupported or missing type' }, { status: 400 })
  } catch (err) {
    console.error('Error revalidating:', err)
    return NextResponse.json({ message: `Error revalidating: ${err}` }, { status: 500 })
  }
}

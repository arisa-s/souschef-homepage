import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ message: 'Missing URL' }, { status: 400 })
    }

    // Call your external scraping service, for example:
    const res = await fetch('https://api.trysouschef.com/recipes/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    // Mock a successful scrape:
    const { recipe } = await res.json()

    // Return the recipeId in the JSON response
    return NextResponse.json({ recipeId: recipe.id }, { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Scrape failed' }, { status: 500 })
  }
}

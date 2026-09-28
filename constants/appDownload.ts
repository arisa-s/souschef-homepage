const IOS_APP_URL =
  'https://apps.apple.com/app/souschef-recipe-organizer/id6468939420'
const ANDROID_APP_URL =
  'https://play.google.com/store/apps/details?id=com.souschef.app'
const ONELINK_URL = 'https://onelink.to/7jpeua'

export type DownloadContent =
  | 'homepage_hero'
  | 'homepage_pricing'
  | 'homepage_modal'
  | 'homepage_nav'
  | 'free_recipe_keeper_app'
  | 'recipe_keeper'

function withCampaign(base: string, content: DownloadContent) {
  const url = new URL(base)
  url.searchParams.set('utm_source', 'website')
  url.searchParams.set('utm_medium', 'seo')
  url.searchParams.set('utm_campaign', 'free_recipe_keeper')
  url.searchParams.set('utm_content', content)
  return url.toString()
}

export function iosDownloadLink(content: DownloadContent) {
  return withCampaign(IOS_APP_URL, content)
}

export function androidDownloadLink(content: DownloadContent) {
  return withCampaign(ANDROID_APP_URL, content)
}

export function onelinkLink(content: DownloadContent) {
  return withCampaign(ONELINK_URL, content)
}

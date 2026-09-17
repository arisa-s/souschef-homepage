/** @type {import('next-sitemap').IConfig} */

function toCanonicalPath(path) {
  // English is unprefixed: /en → /, /en/blog → /blog
  return path.replace(/^\/en(?=\/|$)/, '') || '/'
}

module.exports = {
  // Keep in sync with lib/site.ts. Do not use SITE_URL — it may still be the old .co domain.
  siteUrl: 'https://www.trysouschef.com',
  generateRobotsTxt: true,
  exclude: ['/blog/save-instagram-recipe', '/ja/blog/save-instagram-recipe'],
  transform: async (config, path) => ({
    loc: toCanonicalPath(path),
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    alternateRefs: config.alternateRefs ?? [],
  }),
}

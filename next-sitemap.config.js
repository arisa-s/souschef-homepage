/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Keep in sync with lib/site.ts
  siteUrl: process.env.SITE_URL || 'https://www.trysouschef.com',
  generateRobotsTxt: true,
}
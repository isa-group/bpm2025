import type { APIRoute } from 'astro';
import { metadata } from '#/config.json';

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Disallow: /vcf/
Disallow: /*.vcf$
${metadata.robots.index ? 'Allow' : 'Disallow'}: /

Sitemap: ${sitemapURL.href}
`.trimStart();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL));
};

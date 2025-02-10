import config from '../../astro.config';

const trailingSlash = config.trailingSlash === 'always';
const BASE_PATHNAME = config.base ?? '/';

function trim(str = '', ch?: string) {
  let start = 0,
    end = str.length || 0;
  while (start < end && str[start] === ch) ++start;
  while (end > start && str[end - 1] === ch) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

export const trimSlash = (s: string) => trim(trim(s, '/'));
const createPath = (...params: string[]) => {
  const paths = params
    .map(el => trimSlash(el))
    .filter(el => !!el)
    .join('/');
  return '/' + paths + (trailingSlash && paths ? '/' : '');
};

/**
 * Generates a canonical URL based on the provided path.
 * A canonical URL is the preferred URL for a web page, used to avoid duplicate content issues.
 *
 * @param - The relative path to generate the canonical URL.
 * @returns - The complete canonical URL as a string or URL object.
 */
export const getCanonical = (path = ''): string => {
  const url = String(new URL(path, config.site));

  if (path) {
    if (!trailingSlash && url.endsWith('/')) {
      return url.slice(0, -1);
    } else if (trailingSlash && !url.endsWith('/')) {
      return url + '/';
    }
  }

  return url;
};

/**
 * Creates the permalink using the base path name as base and the provided permalink.
 */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);

/**
 * Gets the URL to an specific page
 */
export const getPermalink = (slug = '', type = 'page'): string => {
  let permalink: string;

  if (
    slug.startsWith('https://')
    || slug.startsWith('http://')
    || slug.startsWith('://')
    || slug.startsWith('#')
    || slug.split('/').at(-1)?.startsWith('#')
    || slug.startsWith('mailto:')
    || slug.startsWith('javascript:')
    || slug.startsWith('data:')
    || slug.startsWith('vbscript:')
  ) {
    return slug;
  }

  switch (type) {
    case 'home':
      permalink = getHomePermalink();
      break;

    case 'asset':
      permalink = getAsset(slug);
      break;

    case 'post':
      permalink = createPath(trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

/**
 * Gets the link to the homepage
 */
export const getHomePermalink = (): string => getPermalink('/');

/**
 * Gets the link to an specific asset
 */
export const getAsset = (path: string): string =>
  '/'
  + [BASE_PATHNAME, path]
    .map(el => trimSlash(el))
    .filter(el => !!el)
    .join('/');

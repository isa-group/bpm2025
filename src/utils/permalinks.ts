import config from '../../astro.config';

const trailingSlash = config.trailingSlash === 'always';

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

const BASE_PATHNAME = config.base ?? '/';

/** */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, config.site));
  if (!trailingSlash && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (trailingSlash && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/** */
export const getPermalink = (slug = '', type = 'page'): string => {
  let permalink: string;

  if (
    slug.startsWith('https://')
    || slug.startsWith('http://')
    || slug.startsWith('://')
    || slug.startsWith('#')
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

/** */
export const getHomePermalink = (): string => getPermalink('/');

/** */
export const getAsset = (path: string): string =>
  '/'
  + [BASE_PATHNAME, path]
    .map(el => trimSlash(el))
    .filter(el => !!el)
    .join('/');

/** */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);

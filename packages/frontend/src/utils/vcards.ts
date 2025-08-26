// src/lib/vcard.ts
export interface StructuredName {
  family: string; // surname
  given: string; // first name
  additional: string; // middle names (space-separated)
  prefixes: string; // honorifics (space-separated)
  suffixes: string; // Jr., III, PhD (space-separated)
}

const KNOWN_PREFIXES = [
  'mr', 'mrs', 'ms', 'miss', 'mx', 'dr', 'prof', 'sir', 'dame', 'rev', 'fr',
  'sr', 'sra', 'srta', 'ing', 'lic'
];
const KNOWN_SUFFIXES = [
  'jr', 'sr', 'ii', 'iii', 'iv', 'phd', 'md', 'esq', 'esquire'
];
// Last-name particles that should stick to the surname
const FAMILY_PARTICLES = [
  'de', 'del', 'de la', 'la', 'le', 'van', 'von', 'der', 'den', 'di', 'da',
  'dos', 'das', 'bin', 'binti', 'ibn', 'al'
];

/**
 * Check if a word is a known prefix (e.g., "Dr.", "Mr", "Prof.")
 * Comparison is case-insensitive and ignores periods.
 */
function isKnownPrefix(word: string) {
  return KNOWN_PREFIXES.includes(word.replace(/\./g, '').toLowerCase());
}
/**
 * Check if a word is a known suffix (e.g., "Jr.", "III", "PhD")
 */
function isKnownSuffix(word: string) {
  return KNOWN_SUFFIXES.includes(word.replace(/\./g, '').toLowerCase());
}

/**
 * Roughly parse "FN" (display name) into vCard "N" parts.
 * Heuristics:
 * - If there's a comma, assume "Family, Given Additional Suffix"
 * - Otherwise assume "Prefix(es) Given Additional Family Suffix(es)"
 * - Attach known particles to the family name.
 */
export function fnToStructuredN(fn: string): StructuredName {
  const name = (fn || '').trim().replace(/\s+/g, ' ');
  if (!name) {
    return { family: '', given: '', additional: '', prefixes: '', suffixes: '' };
  }

  // Split by comma form: "Family Family2, Given Middle Suffix"
  if (name.includes(',')) {
    const [familyRaw, restRaw] = name.split(',', 2).map(s => s.trim());
    const rest = (restRaw ?? '').split(' ');
    const suffixes: string[] = [];
    // peel known suffixes from the end
    while (rest.length && isKnownSuffix(rest[rest.length - 1] ?? '')) {
      suffixes.unshift(rest.pop()!);
    }
    const given = rest.shift() ?? '';
    const additional = rest.join(' ');
    return {
      family: familyRaw ?? '',
      given,
      additional,
      prefixes: '',
      suffixes: suffixes.join(' ')
    };
  }

  // Space form: maybe prefixes at start, suffixes at end
  const parts = name.split(' ');

  // pull prefixes from start
  const prefixes: string[] = [];
  while (parts.length && parts[0] !== undefined && isKnownPrefix(parts[0])) {
    prefixes.push(parts.shift()!);
  }

  // pull suffixes from end
  const suffixes: string[] = [];
  while (parts.length && isKnownSuffix(parts[parts.length - 1] ?? '')) {
    suffixes.unshift(parts.pop()!);
  }

  if (parts.length === 1) {
    return {
      family: parts[0] ?? '',
      given: '',
      additional: '',
      prefixes: prefixes.join(' '),
      suffixes: suffixes.join(' ')
    };
  }

  // Attach family particles to the last surname
  // e.g., "María José de la Vega" → family: "de la Vega"
  const familyTokens: string[] = [parts.pop()!]; // last token is core family
  while (parts.length) {
    const candidate = parts[parts.length - 1];
    // try single- or multi-word particles ("de la")
    const maybeTwo = parts.slice(Math.max(0, parts.length - 2)).join(' ').toLowerCase();
    const maybeThree = parts.slice(Math.max(0, parts.length - 3)).join(' ').toLowerCase();

    if (FAMILY_PARTICLES.includes(maybeThree)) {
      familyTokens.unshift(...parts.splice(parts.length - 3, 3));
    } else if (FAMILY_PARTICLES.includes(maybeTwo)) {
      familyTokens.unshift(...parts.splice(parts.length - 2, 2));
    } else if (candidate !== undefined && FAMILY_PARTICLES.includes(candidate.toLowerCase())) {
      familyTokens.unshift(parts.pop()!);
    } else {
      break;
    }
  }

  const given = parts.shift() ?? '';
  const additional = parts.join(' ');
  const family = familyTokens.join(' ');

  return {
    family,
    given,
    additional,
    prefixes: prefixes.join(' '),
    suffixes: suffixes.join(' ')
  };
}

/**
 * Convert StructuredName to vCard "N" line
 */
export function structuredNToNLine(n: StructuredName) {
  const esc = (s: string) => s.replace(/([;,])/g, '\\$1');
  return `N:${esc(n.family)};${esc(n.given)};${esc(n.additional)};${esc(n.prefixes)};${esc(n.suffixes)}`;
}

/**
 * Make a vCard from a display name (FN) and optional extra fields.
 */
export function makeVCardFromFN(fn: string, extra?: {
  org?: string; title?: string; tel?: string; email?: string; url?: string;
  adr?: { pobox?: string; ext?: string; street?: string; city?: string; region?: string; postal?: string; country?: string };
  note?: string;
}) {
  const n = fnToStructuredN(fn);
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    structuredNToNLine(n),
    `FN:${fn}`,
    extra?.org ? `ORG:${extra.org}` : '',
    extra?.title ? `TITLE:${extra.title}` : '',
    extra?.tel ? `TEL;TYPE=CELL,VOICE:${extra.tel}` : '',
    extra?.email ? `EMAIL;TYPE=INTERNET:${extra.email}` : '',
    extra?.url ? `URL:${extra.url}` : '',
    extra?.adr
      ? `ADR;TYPE=WORK:${[
        extra.adr.pobox ?? '',
        extra.adr.ext ?? '',
        extra.adr.street ?? '',
        extra.adr.city ?? '',
        extra.adr.region ?? '',
        extra.adr.postal ?? '',
        extra.adr.country ?? ''
      ].join(';')}`
      : '',
    extra?.note ? `NOTE:${extra.note}` : '',
    'END:VCARD'
  ].filter(Boolean);

  return lines.join('\r\n'); // use CRLF
}

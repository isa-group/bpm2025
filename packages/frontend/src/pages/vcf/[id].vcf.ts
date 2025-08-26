import type { APIRoute } from 'astro';
import { fnToStructuredN, structuredNToNLine } from '#/utils/vcards';
import { participants, type Participant } from '#/data/participants';

// const contacts: Record<string, {
//   n?: string; fn: string; org?: string; title?: string;
//   tel?: string; email?: string; url?: string; adr?: string; note?: string;
// }> = {
//   john: {
//     n: 'Doe;John;;;',
//     fn: 'John Doe',
//     org: 'Acme Inc.',
//     title: 'Senior Engineer',
//     tel: '+1-555-0100',
//     email: 'john.doe@example.com',
//     url: 'https://example.com',
//     adr: ';;1 Infinite Loop;Cupertino;CA;95014;USA',
//     note: 'Thanks for reaching out!'
//   },
//   maria: { fn: 'María García de la Vega', tel: '+34-600-000-000', email: 'maria@example.es' }
//   // add more ids...
// };

const makeVCard = (c: Participant) => {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    structuredNToNLine(fnToStructuredN(c.name)),
    `FN:${c.name}`,
    c.institution ? `ORG:${c.institution}` : '',
    // c.title ? `TITLE:${c.title}` : '',
    // c.tel ? `TEL;TYPE=CELL:${c.tel}` : '',
    c.email ? `EMAIL;TYPE=INTERNET:${c.email}` : '',
    // c.url ? `URL:${c.url}` : '',
    // c.adr ? `ADR;TYPE=WORK:${c.adr}` : '',
    // c.note ? `NOTE:${c.note}` : '',
    'END:VCARD'
  ].filter(Boolean);
  return lines.join('\r\n'); // CRLF
};

export const GET: APIRoute = ({ params }) => {
  const id = params.id?.toLowerCase() ?? '';
  const contact = participants[id];

  if (!contact) {
    return new Response('Not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow, noarchive' }
    });
  }

  const vcard = makeVCard(contact);
  return new Response(vcard, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${id}.vcf"`,
      // SEO hard-stop:
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      // Optional caching:
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};
// Note: if you want to enable prerendering, you must set `export const prerender = true;`
// and remove the Cache-Control header above.
// However, this is not recommended if you plan to add more contacts later,
// as the file will be cached by browsers and CDNs for a long time.

export const prerender = true;

/**
 * Dynamic route generator
 */
export function getStaticPaths() {
  return Object.keys(participants).map((id: string) => ({ params: { id } }));
}

import type { SponsorInfo } from '@/types';
import CEURLogo from '@/assets/images/sponsors/CEUR-WS-logo.png';
import SCORELogo from '@/assets/images/sponsors/score.png';
import SpringerLogo from '@/assets/images/sponsors/springer.jpg';
import USLogo from '@/assets/images/sponsors/us.png';

export const sponsors: SponsorInfo[] = [
  {
    category: 'Gold',
    brands: []
  },
  {
    category: 'Silver',
    brands: []
  },
  {
    category: 'Bronze',
    brands: []
  },
  {
    category: 'Academic',
    brands: [
      {
        src: CEURLogo,
        alt: 'CEUR-WS logo',
        href: 'https://ceur-ws.org/'
      },
      {
        src: SCORELogo,
        alt: 'SCORE logo',
        href: 'https://score.us.es/'
      },
      {
        src: SpringerLogo,
        alt: 'Springer logo',
        href: 'https://link.springer.com/'
      },
      {
        src: USLogo,
        alt: 'University of Seville logo',
        href: 'https://www.us.es/'
      }
    ]
  }
];

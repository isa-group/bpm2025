import type { SponsorInfo } from '#/types';
import CEURLogo from '#/assets/images/sponsors/CEUR-WS-logo.png';
import SCORELogo from '#/assets/images/sponsors/score.png';
import SpringerLogo from '#/assets/images/sponsors/springer.jpg';
import USLogo from '#/assets/images/sponsors/us.png';
import ProcessScience from '#/assets/images/sponsors/process-science.png';

export const sponsors: SponsorInfo[] = [
  {
    category: 'Gold',
    brands: [{
      src: ProcessScience,
      alt: 'Process.Science',
      href: 'https://www.process-science.com/es',
      description: `
        <p>We are Process.Science, a Hamburg-based company transforming the landscape of process analytics since 2019.
        Our core innovation lies in making sophisticated process analysis accessible by integrating process mining capabilities
        directly into widely used business intelligence tools like Microsoft Power BI, Tableau and Qlik Sense.</p>

        <br />

        <p>Our foundation combines practical expertise with strong academic roots – our co-founder Urszula Jessen's doctoral research
        in process mining forms the basis of our scientific approach. Through our partnerships with international universities and
        continuous research-based development, we bridge the gap between academic excellence and practical
        business applications in process management.</p>

        <br />

        <p>At BPM 2025, we look forward to demonstrating how our solution helps organizations across
        various industries identify and optimize their critical business processes. We invite you to explore
        how process excellence can be achieved without complex implementations or additional software investments.</p>
      `
    }]
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
        alt: 'CEUR-WS',
        href: 'https://ceur-ws.org/'
      },
      {
        src: SCORELogo,
        alt: 'SCORE',
        href: 'https://score.us.es/'
      },
      {
        src: SpringerLogo,
        alt: 'Springer',
        href: 'https://link.springer.com/'
      },
      {
        src: USLogo,
        alt: 'University of Seville',
        href: 'https://www.us.es/'
      }
    ]
  }
];

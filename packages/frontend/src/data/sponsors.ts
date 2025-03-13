import type { SponsorInfo } from '#/types';
import CEURLogo from '#/assets/images/sponsors/CEUR-WS-logo.png';
import SCORELogo from '#/assets/images/sponsors/score.png';
import SpringerLogo from '#/assets/images/sponsors/springer.svg';
import USLogo from '#/assets/images/sponsors/us.png';
import ProcessScience from '#/assets/images/sponsors/process-science.png';
import GBTEC from '#/assets/images/sponsors/GBTEC.png';

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
    brands: [{
      src: GBTEC,
      alt: 'GBTEC',
      href: 'https://www.gbtec.com/',
      description: `
        GBTEC is a leading provider of SaaS software in the fields of Business Process Management (BPM),
        Enterprise Architecture Management (EAM), Digital Process Automation (DPA), and Governance, Risk, and Compliance (GRC).
        The extensive product portfolio of GBTEC includes Business Process Design & Modeling, Process Execution,
        Process Mining, as well as Governance, Risk, and Compliance (GRC). The company is known for its modern and user-friendly
        products, which are based on no-code and low-code technologies and a state-of-the-art product platform.
        Customers also benefit from competent customer support and comprehensive training offerings.
        The products of GBTEC are used by companies of all sizes, from SMEs to Fortune 500 companies,
        as well as by public institutions. The company is headquartered in Bochum and employs around 300 employees at locations
        in the DACH region, Spain, Australia, the UK and the USA.
        <br /><br />
        For more information, see <a href="https://www.gbtec.com/" class="underline">https://www.gbtec.com/</a>.
      `
    }]
  },
  {
    category: 'Academic',
    brands: [
      {
        src: USLogo,
        alt: 'University of Seville',
        href: 'https://www.us.es/'
      },
      {
        src: SCORELogo,
        alt: 'SCORE',
        href: 'https://score.us.es/'
      },
      {
        src: CEURLogo,
        alt: 'CEUR-WS',
        href: 'https://ceur-ws.org/'
      },
      {
        src: SpringerLogo,
        alt: 'Springer',
        href: 'https://link.springer.com/'
      }
    ]
  }
];

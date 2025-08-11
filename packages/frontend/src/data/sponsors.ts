import type { SponsorInfo } from '#/types';
// import CEURLogo from '#/assets/images/sponsors/CEUR-WS-logo.png';
import CelonisLogo from '#/assets/images/sponsors/celonis.svg';
import SCORELogo from '#/assets/images/sponsors/score.svg';
import SpringerLogo from '#/assets/images/sponsors/springer.svg';
import USLogo from '#/assets/images/sponsors/us.svg';
import ProcessScience from '#/assets/images/sponsors/process-science.svg';
import GBTEC from '#/assets/images/sponsors/GBTEC.svg';
import Iterem from '#/assets/images/sponsors/iterem.svg';
import InteractSolutions from '#/assets/images/sponsors/interact.svg';
import SAPSignavio from '#/assets/images/sponsors/SAP_Signavio.svg';
import DCRSolutions from '#/assets/images/sponsors/dcr-solutions.webp';
import AuraQuantic from '#/assets/images/sponsors/AuraQuantic.svg';

export const sponsors: SponsorInfo[] = [
  {
    category: 'Platinum',
    brands: [{
      src: CelonisLogo,
      alt: 'Celonis',
      href: 'https://www.celonis.com',
      class: 'max-h-50',
      description: `
        Celonis makes processes work for people, companies and the planet.
        The Celonis Process Intelligence Platform uses industry-leading process mining and AI technology
        and augments it with business context to give customers a living digital twin of their business operation.
        It’s system-agnostic and without bias, and provides everyone with a common language for understanding and improving businesses.
        Celonis enables its customers to continuously realize significant value across the top, bottom, and green line.
        Celonis is headquartered in Munich, Germany, and New York City, USA, with more than 20 offices worldwide.
        <br />
        <a href="https://www.celonis.com" class="underline">https://www.celonis.com</a>
      `
    }]
  },
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
    },
    {
      src: SAPSignavio,
      alt: 'SAP Signavio',
      href: 'https://www.signavio.com/',
      description: `
          Sharpen your competitive edge by making transformation a core capability. With SAP Signavio solutions,
          focus on process excellence in business transformations and help bring your company vision to life.
        `
    },
    {
      src: AuraQuantic,
      alt: 'AuraQuantic',
      href: 'https://www.auraquantic.com',
      description: `
          AuraQuantic is a No-Code digital platform designed to help business users easily and rapidly build 
          unlimited processes and applications for automating end-to-end operations. This innovative solution 
          enables organizations to reduce costs and optimize productivity by streamlining workflows and 
          enhancing operational efficiency. With AuraQuantic, users can create tailored applications without 
          the need for extensive programming knowledge, making it accessible to a wide range of professionals 
          across various industries.
        `
    }
    ]
  },
  {
    category: 'Silver',
    brands: []
  },
  {
    category: 'Bronze',
    brands: [
      {
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
      },
      {
        src: Iterem,
        alt: 'Iterem',
        href: 'https://iterem.com/',
        description: `
          We accompany organizations on their journey towards operational efficiency, process optimization, and digital innovation.
          We offer a consultative and customized approach that integrates advanced process management solutions.
          We guide businesses at every stage to ensure sustainable evolution aligned with their strategic objectives.
          We design strategies, manage change, and empower teams to maximize the business impact of technology.
          With a methodology that integrates people, processes, and technology, we help companies to visualize, control, and optimize their operations through:
          <br />
          <br />
          <ul class="list-disc list-inside">
            <li>Strategic consulting in BPM and Process architecture</li>
            <li>Process automation</li>
            <li>Process mining and operational intelligence</li>
            <li>AI-based solutions</li>
          </ul>
          <br />
          Our projects have enabled organizations ranging from public entities to private sector companies to significantly improve their processes and operations.
          We have helped to optimize user service management, digitize administrative procedures and increase agility and accuracy in decision making, among others.
          These projects have not only improved efficiency and transparency, but have also facilitated regulatory compliance, fostered innovation and
          promoted new ways of working. At the 23<sup>rd</sup> International Conference on Business Process Management (BPM 2025), we look forward to sharing ideas,
          experiences, and contributing to the advancement of BPM practices as part of this community dedicated to continuous improvement,
          always with an eye on the future. We invite you to meet us at the venue so that we can share experiences and continue to drive the collective success of
          process management.
      `
      },
      {
        src: DCRSolutions,
        alt: 'DCR Solutions',
        href: 'https://dcrsolutions.net/',
        description: `
          <a href="https://dcrsolutions.net/" class="underline">DCR Solutions</a> spearheads Business Process Management
          with its declarative, rules-based approach, fostering operational excellence through modeling or process
          mining, marking a paradigm shift towards multi-faceted objects. While BPM traditionally demands technical
          proficiency, DCR empowers business professionals across sectors, enabling lawyers and social workers to
          seamlessly integrate legal frameworks into processes, ensuring both compliance and efficiency.
        `
      },
      {
        src: InteractSolutions,
        alt: 'Interact Solutions',
        href: 'https://www.interactsolutions.com/en/',
        description: `
          <p>
            Interact Solutions has been in the market for over 25 years,
            offering comprehensive software for Corporate Governance.
            In our portfolio, we highlight Interact Flow, a free platform for process modeling. 
            <a class="underline" href="https://www.interactsolutions.com/interact-flow/">Try it here</a>.
          </p>
          <br />
          <p>
            With Interact Suite SA, we provide our clients with integrated solutions for
            Business Process Management (BPM), Project Management, Strategic Planning (BSC),
            Risk and Compliance Management (GRC), Quality Management, as well as
            Audit Management, Services, Surveys, and Competency Management.
          </p>
          <br />
          <p>
            Interact also makes available a specialized team for project development,
            with the possibility of customization according to the needs of each organization,
            in addition to offering specialized and multilingual technical support.
          </p>
          <br />
          <p>
            Through our platform, institutions can visualize their businesses end-to-end,
            covering KPIs, action plans, process modeling and automation,
            project structuring and management, risk mapping and mitigation,
            among others.
          </p>
          <br />
          <p>
            Interact has a strong presence in public and private companies,
            both nationally and internationally, with experience in various sectors.
            It stands out especially in institutions seeking accreditations and
            certifications, relying on the collaboration between methodologies and technology.
          </p>
          <br />
          <p>
            We believe that methodologies are fundamental for the strategic understanding
            of businesses, while technology provides the foundation for the effective
            structuring and execution of operations. For this reason, we have the collaboration
            of two leading figures in the field: Gart Capote and Pedro Robledo,
            who have contributed significantly to the evolution and expansion of our tools.
          </p>
          <br />
          <p>
            Currently, Interact is present in 16 countries, operating through clients, 
            partners, and distributors, with a focus on expansion into Europe.
          </p>
          <br />
          <p>
            For more information, see
            <a class="underline" href="https://www.interactsolutions.com/en/">https://www.interactsolutions.com/en/</a>
          </p>
        `
      }
    ]
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
      // {
      //   src: CEURLogo,
      //   alt: 'CEUR-WS',
      //   href: 'https://ceur-ws.org/'
      // },
      {
        src: SpringerLogo,
        alt: 'Springer',
        href: 'https://link.springer.com/'
      }
    ]
  }
];

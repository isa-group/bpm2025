import { program_name_to_uri, program_overviews } from '#/data/program';
import type { CallForPapers, CallToAction, MenuLink } from '#/types';
import type { Props as FooterProps } from '#/components/widgets/Footer.astro';
import { getAsset, getPermalink, trimSlash } from '#/utils/permalinks';

const matches = import.meta.glob('../pages/calls/*.mdx', { eager: true });
const posts = Object.values(matches) as CallForPapers[];
const calls = () => posts
  .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
  .map(post =>
    ({
      text: post.frontmatter.title,
      href: getPermalink(post.url)
    })
  );

interface HeaderData {
  links?: MenuLink[];
  actions?: CallToAction[];
}

interface FooterData {
  links: FooterProps['links'];
  secondaryLinks: FooterProps['secondaryLinks'];
  socialLinks: FooterProps['socialLinks'];
}

/**
 * Checks if the current URL is within the registration pages
 */
export function isInRegistrationPage(currentUrl: URL): boolean {
  const sanitized = trimSlash(currentUrl.pathname);

  return sanitized.includes('registration') && !sanitized.includes('terms');
}

/**
 * Generates the object that programatically creates the navigation
 * header data
 */
export function getHeaderData(currentUrl: URL): HeaderData {
  const initialData: HeaderData = {
    links: [
      {
        text: 'Conference',
        links: [
          {
            text: 'Conference Chairs',
            href: getPermalink('/conference/chairs')
          },
          {
            text: 'Program Committee',
            href: getPermalink('/conference/committees/program')
          },
          {
            text: 'Steering Committee',
            href: getPermalink('/conference/committees/steering')
          },
          {
            text: 'Organizing Team',
            href: getPermalink('/conference/organization')
          }
        ]
      },
      {
        text: 'Program',
        links: [
          {
            text: 'Overview',
            href: getPermalink('/program/overview')
          },
          {
            text: 'Keynotes',
            href: getPermalink('/program/keynotes')
          },
          ...program_overviews.map(o => ({
            text: o.name,
            href: getPermalink(`/program/${program_name_to_uri(o.name)}`)
          })),
          {
            text: 'Social events',
            href: getPermalink('/program/social-events')
          },
          {
            text: 'Jornada BPM Administración Pública',
            href: getPermalink('/program/bpm-admin')
          },
          {
            text: 'Mentoring Lunch for Junior BPM Researchers',
            href: getPermalink('/program/mentoring-lunch')
          }
        ]
      },
      {
        text: 'Workshops',
        href: getPermalink('/workshops')
      },
      {
        text: 'Calls',
        links: [
          {
            text: 'Important dates',
            href: getPermalink('/calls/dates')
          },
          ...calls()
        ]
      },
      {
        text: 'Venue',
        links: [
          {
            text: 'Conference Venue',
            href: getPermalink('/venue')
          },
          {
            text: 'How to get there',
            href: getPermalink('/venue/getting-there')
          },
          {
            text: 'Where to stay',
            href: getPermalink('/venue/where-to-stay')
          },
          {
            text: 'Visa information',
            href: getPermalink('/venue/visa')
          },
          {
            text: 'The city of Seville',
            href: getPermalink('/venue/the-city')
          },
          {
            text: 'Getting around',
            href: getPermalink('/venue/getting-around')
          }
        ]
      },
      {
        text: 'Sponsors',
        links: [
          {
            text: 'Our sponsors',
            href: getPermalink('/sponsors')
          },
          {
            text: 'Become a sponsor',
            href: getPermalink('/sponsors/become-a-sponsor')
          }
        ]
      }
    ]
  };

  initialData.actions ??= [];

  if (!isInRegistrationPage(currentUrl)) {
    initialData.actions.push({
      text: 'Registration info',
      href: getPermalink('/registration'),
      variant: 'primary'
    }
    );
  }

  // initialData.actions.push({
  //   text: 'App',
  //   href: getPermalink('/app'),
  //   variant: 'primary'
  // });

  return initialData;
};

export const getFooterData = (): FooterData => ({
  links: [
    {
      title: 'Workshops',
      links: [
        { text: 'AI4BPM', href: getPermalink(
          '/workshops/#9th-international-workshop-on-artificial-intelligence-for-business-process-management-ai4bpm'
        ) },
        { text: 'AUTOMATE', href: getPermalink(
          '/workshops/#1st-international-workshop-on-implementation-and-management-of-intelligent-process-automation-solutions-automate'
        ) },
        { text: 'BP-Meet-IoT', href: getPermalink(
          '/workshops/#9th-international-workshop-on-business-processes-meet-the-internet-of-things-bp-meet-iot'
        ) },
        { text: 'ProDy', href: getPermalink(
          '/workshops/#5th-workshop-on-change-drift-and-dynamics-of-organizational-processes-prody'
        ) },
        { text: 'DLT4BPM', href: getPermalink(
          '/workshops/#1st-workshop-on-distributed-ledger-technologies-in-business-process-management-dlt4bpm'
        ) },
        { text: 'FM-BPM', href: getPermalink(
          '/workshops/#3rd-international-workshop-on-formal-methods-for-business-process-management-fm-bpm'
        ) },
        { text: 'Innov8BPM', href: getPermalink(
          '/workshops/#2nd-international-workshop-on-managing-process-innovation-in-the-era-of-digital-transformation-innov8bpm'
        ) },
        { text: 'NLP4BPM', href: getPermalink(
          '/workshops/#4th-workshop-on-natural-language-processing-for-business-process-management-nlp4bpm'
        ) },
        { text: 'OBJECTS', href: getPermalink(
          '/workshops/#3rd-workshop-on-object-centric-processes-from-a-to-z-objects'
        ) },
        { text: 'PLC', href: getPermalink(
          '/workshops/#2nd-international-workshop-on-processes-laws-and-compliance-plc'
        ) },
        { text: 'VIPRA', href: getPermalink(
          '/workshops/#2nd-workshop-on-visual-process-analytics-vipra'
        ) }
      ]
    },
    {
      title: 'Calls',
      links: [
        {
          text: 'Important dates',
          href: getPermalink('/calls/dates')
        },
        ...calls()
      ]
    },
    {
      title: 'Venue',
      links: [
        { text: 'Location', href: getPermalink('/venue/#location') }
      ]
    },
    {
      title: 'Getting there',
      links: [
        { text: 'From Seville airport (SVQ)', href: getPermalink('/venue/getting-there/#from-seville-airport-svq') },
        { text: 'From Malaga airport (AGP)', href: getPermalink('/venue/getting-there/#from-malaga-airport-agp') },
        { text: 'From Madrid airport (MAD)', href: getPermalink('/venue/getting-there/#from-madrid-airport-mad') },
        { text: 'Train station', href: getPermalink('/venue/getting-there/#train-station') }
      ]
    },
    {
      title: 'Where to stay',
      links: [
        { text: 'Meliá Sevilla', href: getPermalink('venue/where-to-stay/#melia') },
        { text: 'Hesperia Sevilla Hotel', href: getPermalink('venue/where-to-stay/#hesperia') },
        { text: 'Novotel Sevilla', href: getPermalink('venue/where-to-stay/#novotel') },
        { text: 'Barceló Occidental Sevilla Viapol', href: getPermalink('venue/where-to-stay/#barcelo') },
        { text: 'Hotel Pasarela', href: getPermalink('venue/where-to-stay/#pasarela') },
        { text: 'NH Collection', href: getPermalink('venue/where-to-stay/#nh') },
        { text: 'Ibis Styles Sevilla City Santa Justa', href: getPermalink('venue/where-to-stay/#ibis') }
      ]
    },
    {
      title: 'Visa information',
      links: [
        { text: 'EU/EEA Nationals', href: getPermalink('/venue/visa/#eu') },
        { text: 'Non-EU/EEA Nationals', href: getPermalink('/venue/visa/#non-eu') },
        { text: 'How do I apply for a visa?', href: getPermalink('/venue/visa/#apply') },
        { text: 'How can I get an invitation letter?', href: getPermalink('/venue/visa/#invitation-letter') }
      ]
    },
    {
      title: 'Getting around',
      links: [
        { text: 'TUSSAM', href: getPermalink('/venue/getting-around/#tussam') },
        { text: 'Metro', href: getPermalink('/venue/getting-around/#metro') },
        { text: 'Taxi', href: getPermalink('/venue/getting-around/#taxi') },
        { text: 'Uber, Cabify & Bolt', href: getPermalink('/venue/getting-around/#vtc') },
        { text: 'Bicycle', href: getPermalink('/venue/getting-around/#bicycle') },
        { text: 'Motorbike', href: getPermalink('/venue/getting-around/#motorbike') }
      ]
    },
    {
      title: 'Sponsors',
      links: [
        { text: 'Our sponsors', href: getPermalink('/sponsors') },
        { text: 'Become a sponsor', href: getPermalink('/sponsors/become-a-sponsor') }
      ]
    }
  ],
  secondaryLinks: [
    { text: 'Legal', href: getPermalink('/terms/legal') },
    { text: 'T&Cs', href: getPermalink('/terms/registration') },
    { text: 'Privacy', href: getPermalink('/terms/privacy') },
    { text: 'Sitemap', href: getAsset('/sitemap-index.xml') }
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'i-tabler:brand-x', href: 'https://x.com/bpmconf' },
    { ariaLabel: 'Email', icon: 'i-tabler:mail', href: 'mailto:info@bpm2025seville.org' }
  ]
});

import type { CallToAction, MenuLink } from '@/types';
import type { Props as FooterProps } from '@/components/widgets/Footer.astro';
import { getPermalink } from '@/utils/permalinks';
import ITablerBrandX from 'virtual:icons/tabler/brand-x';
import ITablerMail from 'virtual:icons/tabler/mail';

interface HeaderData {
  links?: MenuLink[];
  actions?: CallToAction[];
}

interface FooterData {
  links: FooterProps['links'];
  secondaryLinks: FooterProps['secondaryLinks'];
  socialLinks: FooterProps['socialLinks'];
}

export const headerData: HeaderData = {
  links: [
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'Conference',
      links: [
        {
          text: 'Conference Chairs',
          href: '/conference/chairs'
        },
        {
          text: 'Program Committee',
          href: '/conference/committees/program'
        },
        {
          text: 'Steering Committee',
          href: '/conference/committees/steering'
        }
      ]
    },
    {
      text: 'Calls',
      links: [
        {
          text: 'Call for research papers',
          href: '/calls/research-papers'
        }
      ]
    },
    {
      text: 'Venue',
      links: [
        {
          text: 'Conference Venue',
          href: '/venue'
        },
        {
          text: 'How to get there',
          href: '/venue/getting-there'
        },
        {
          text: 'Where to stay',
          href: '/venue/where-to-stay'
        },
        {
          text: 'Visa information',
          href: '/venue/visa'
        },
        {
          text: 'The city of Seville',
          href: '/venue/the-city'
        },
        {
          text: 'Sponsors',
          href: '/venue/getting-around'
        }
      ]
    },
    {
      text: 'Sponsors',
      links: [
        {
          text: 'Our sponsors',
          href: '/sponsors'
        },
        {
          text: 'Become a sponsor',
          href: '/sponsors/become-a-sponsor'
        }
      ]
    }
  ],
  actions: [
    {
      text: 'Register',
      href: '/register',
      variant: 'primary'
    }
  ]
};

export const footerData: FooterData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Enterprise', href: '#' },
        { text: 'Customer stories', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Resources', href: '#' }
      ]
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' }
      ]
    }
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') }
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: ITablerBrandX, href: 'https://x.com/bpmconf' },
    { ariaLabel: 'Email', icon: ITablerMail, href: 'mailto:info@bpm2025seville.org' }
  ]
};

import { getPermalink } from '@/utils/permalinks';
import ITablerBrandX from 'virtual:icons/tabler/brand-x';
import ITablerMail from 'virtual:icons/tabler/mail';

export const headerData = {
  links: [
    {
      text: 'Homes',
      links: [
        {
          text: 'SaaS',
          href: getPermalink('/homes/saas')
        },
        {
          text: 'Startup',
          href: getPermalink('/homes/startup')
        },
        {
          text: 'Mobile App',
          href: getPermalink('/homes/mobile-app')
        },
        {
          text: 'Personal',
          href: getPermalink('/homes/personal')
        }
      ]
    },
    {
      text: 'Pages',
      links: [
        {
          text: 'Features (Anchor Link)',
          href: getPermalink('/#features')
        },
        {
          text: 'Services',
          href: getPermalink('/services')
        },
        {
          text: 'Pricing',
          href: getPermalink('/pricing')
        },
        {
          text: 'About us',
          href: getPermalink('/about')
        },
        {
          text: 'Contact',
          href: getPermalink('/contact')
        },
        {
          text: 'Terms',
          href: getPermalink('/terms')
        },
        {
          text: 'Privacy policy',
          href: getPermalink('/privacy')
        }
      ]
    },
    {
      text: 'Landing',
      links: [
        {
          text: 'Lead Generation',
          href: getPermalink('/landing/lead-generation')
        },
        {
          text: 'Long-form Sales',
          href: getPermalink('/landing/sales')
        },
        {
          text: 'Click-Through',
          href: getPermalink('/landing/click-through')
        },
        {
          text: 'Product Details (or Services)',
          href: getPermalink('/landing/product')
        },
        {
          text: 'Coming Soon or Pre-Launch',
          href: getPermalink('/landing/pre-launch')
        },
        {
          text: 'Subscription',
          href: getPermalink('/landing/subscription')
        }
      ]
    }
  ],
  actions: [{ text: 'Register', href: '/register' }]
};

export const footerData = {
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

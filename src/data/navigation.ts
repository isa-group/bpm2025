import type { CallToAction, MenuLink } from '@/types';
import type { Props as FooterProps } from '@/components/widgets/Footer.astro';
import { getAsset, getHomePermalink, getPermalink } from '@/utils/permalinks';
import ITablerBrandX from 'virtual:icons/tabler/brand-x';
import ITablerMail from 'virtual:icons/tabler/mail';
import { conferenceChairs } from '@/data/people';

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
      href: getHomePermalink()
    },
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
        }
      ]
    },
    {
      text: 'Calls',
      links: [
        {
          text: 'Call for research papers',
          href: getPermalink('/calls/research-papers')
        },
        {
          text: 'Call for workshops',
          href: getPermalink('/calls/workshops')
        }
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
  // actions: [
  //   {
  //     text: 'Register',
  //     href: getPermalink('/register'),
  //     variant: 'primary'
  //   }
  // ]
};

export const footerData: FooterData = {
  links: [
    {
      title: 'Conference Chairs',
      links: Object.keys(conferenceChairs).map(k => ({
        text: k,
        href: getPermalink(`/conference/chairs/#${encodeURIComponent(k.toLowerCase().replace(' ', '-'))}`)
      }))
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
        { text: 'Hesperia Sevilla Hotel', href: getPermalink('venue/where-to-stay/#hesperia') },
        { text: 'Novotel Sevilla', href: getPermalink('venue/where-to-stay/#novotel') },
        { text: 'Barceló Occidental Sevilla Viapol', href: getPermalink('venue/where-to-stay/#barcelo') }
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
    { text: 'Sitemap', href: getAsset('/sitemap-index.xml') }
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: ITablerBrandX, href: 'https://x.com/bpmconf' },
    { ariaLabel: 'Email', icon: ITablerMail, href: 'mailto:info@bpm2025seville.org' }
  ]
};

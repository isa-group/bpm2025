import type { HTMLAttributes, ComponentProps } from 'astro/types';
import { Image as ImageComponent } from 'astro:assets';
import ITablerCheck from 'virtual:icons/tabler/check';

export type IconElement = typeof ITablerCheck;
// There are some hacks to get this type working properly:
// https://github.com/withastro/astro/issues/10912
// https://github.com/withastro/astro/issues/10780
type MakeOptional<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]?: T[P];
} & {
  [P in keyof T as P extends K ? never : P]: T[P];
};
type SkippedProps = 'width' | 'height' | 'inferSize';
type ImageComponentProps = Omit<ComponentProps<typeof ImageComponent>, 'slot' | 'children'>;
type ExtendedImageProps = MakeOptional<ImageComponentProps, SkippedProps>;
type ExtendedImagePropsWithDescription = ExtendedImageProps & { description?: boolean | string };

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataOpenGraph {
  url?: string;
  siteName?: string;
  images?: MetaDataImage[];
  locale?: string;
  type?: string;
}

export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: string;
}
export interface MetaData {
  title?: string;
  ignoreTitleTemplate?: boolean;
  canonical?: string;
  robots?: MetaDataRobots;
  description?: string;
  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
}

export interface Widget {
  id?: string;
  isDark?: boolean;
  bg?: string;
  classes?: Record<string, string | Record<string, string>>;
}

export interface Headline {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: Record<string, string>;
}

interface TeamMember {
  name?: string;
  job?: string;
  image?: ExtendedImageProps;
  socials?: Social[];
  description?: string;
  classes?: Record<string, string>;
}

interface Social {
  icon?: IconElement;
  href?: string;
}

export interface Stat {
  amount?: number | string;
  title?: string;
  icon?: IconElement;
}

export interface Item {
  title?: string;
  description?: string;
  icon?: IconElement;
  classes?: Record<string, string>;
  callsToAction?: CallToAction[];
  image?: ExtendedImageProps;
}

export interface Price {
  title?: string;
  subtitle?: string;
  description?: string;
  price?: number | string;
  period?: string;
  items?: Item[];
  callToAction?: CallToAction;
  hasRibbon?: boolean;
  ribbonTitle?: string;
}

export interface Testimonial {
  title?: string;
  testimonial?: string;
  items?: Item[];
  name?: string;
  job?: string;
  image?: ExtendedImageProps;
}

export interface Input {
  type: HTMLInputTypeAttribute;
  name: string;
  label?: string;
  autocomplete?: string;
  placeholder?: string;
}

export interface Textarea {
  label?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
}

export interface Disclaimer {
  id?: string;
  name?: string;
  label?: string;
}

// COMPONENTS
export interface CallToAction extends BetterOmit<HTMLAttributes<'a'>, 'slot'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  text?: string;
  icon?: IconElement;
  classes?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
}

export interface ItemGrid {
  items?: Item[];
  columns?: number;
  classes?: Record<string, string>;
}

export type ItemList = BetterOmit<ItemGrid, 'columns'>;

export interface Collapse {
  iconUp?: string;
  iconDown?: string;
  items?: Item[];
  columns?: number;
  classes?: Record<string, string>;
}

export interface Form {
  inputs?: Input[];
  textarea?: Textarea;
  disclaimers?: Disclaimer[];
  button?: string;
  description?: string;
}

// WIDGETS
export interface Hero extends BetterOmit<Headline, 'classes'>, BetterOmit<Widget, 'isDark' | 'classes'> {
  content?: string;
  actions?: string | CallToAction[];
  image?: ExtendedImageProps;
}

export interface Team extends BetterOmit<Headline, 'classes'>, Widget {
  team?: TeamMember[];
}

export interface Stats extends BetterOmit<Headline, 'classes'>, Widget {
  stats?: Stat[];
}

export interface Pricing extends BetterOmit<Headline, 'classes'>, Widget {
  prices?: Price[];
}

export interface Testimonials extends BetterOmit<Headline, 'classes'>, Widget {
  testimonials?: Testimonial[];
  callToAction?: CallToAction;
}

export interface SponsorInfo {
  category: string;
  brands: (ExtendedImageProps & { href?: string })[];
}
export interface Brands extends BetterOmit<Headline, 'classes'>, Widget {
  icons?: IconElement[];
  images?: SponsorInfo['brands'];
}

export interface Features extends BetterOmit<Headline, 'classes'>, Widget {
  image?: ExtendedImageProps;
  video?: Video;
  items?: Item[];
  columns?: number;
  callToAction1?: CallToAction;
  callToAction2?: CallToAction;
  isReversed?: boolean;
  isBeforeContent?: boolean;
  isAfterContent?: boolean;
}

export interface Faqs extends BetterOmit<Headline, 'classes'>, Widget {
  iconUp?: string;
  iconDown?: string;
  items?: Item[];
  columns?: number;
}

export interface Steps extends BetterOmit<Headline, 'classes'>, Widget {
  items: {
    title: string;
    description?: string;
    icon?: IconElement;
    classes?: Record<string, string>;
  }[];
  callToAction?: string | CallToAction;
  image?: ExtendedImageProps;
  isReversed?: boolean;
}

export interface Content extends BetterOmit<Headline, 'classes'>, Widget {
  content?: string;
  images?: ExtendedImagePropsWithDescription[];
  items?: Item[];
  columns?: number;
  isReversed?: boolean;
  isAfterContent?: boolean;
  callToAction?: CallToAction;
}

export interface Contact extends BetterOmit<Headline, 'classes'>, Form, Widget {}

interface Link {
  text?: string;
  href?: string;
  ariaLabel?: string;
  icon?: IconElement;
}

export interface MenuLink extends Link {
  links?: MenuLink[];
}

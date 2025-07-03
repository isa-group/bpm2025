import type { HTMLAttributes, ComponentProps } from 'astro/types';
import type { Props as AstroSeoProps } from '@astrolib/seo';
import { Image as ImageComponent } from 'astro:assets';
import type { ImageMetadata, MarkdownInstance } from 'astro';

export type IconElement = `i-${string}:${string}`;
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

interface Classes {
  container: string;
  panel: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  subtitle: string;
  images: string;
  headline: string;
  content: string;
}

export interface MetaData {
  title?: AstroSeoProps['title'];
  ignoreTitleTemplate?: boolean;
  canonical?: AstroSeoProps['canonical'];
  description?: AstroSeoProps['description'];
  openGraph?: AstroSeoProps['openGraph'];
  twitter?: AstroSeoProps['twitter'];
}

export interface Widget {
  id?: string;
  isDark?: boolean;
  bg?: ImageMetadata | boolean;
  classes?: Partial<Classes>;
}

export interface Headline {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: Partial<Classes>;
}

export interface Item {
  title?: string;
  description?: string;
  icon?: IconElement;
  classes?: Partial<Classes>;
  callsToAction?: CallToAction[];
  extraHtml?: string;
  image?: ExtendedImageProps;
}

export interface Price {
  title?: string;
  subtitle?: string;
  description?: string;
  pricing?: {
    price: number | string;
    currency: string;
    period?: string;
    variant?: 'primary' | 'secondary';
  }[];
  items?: Item[];
  callToAction?: CallToAction;
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

export interface Input extends astroHTML.JSX.InputHTMLAttributes {
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
}

export interface Select extends astroHTML.JSX.SelectHTMLAttributes {
  label?: string;
}

export interface Textarea extends astroHTML.JSX.TextareaHTMLAttributes {
  label?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
}

export interface Disclaimer extends BetterOmit<astroHTML.JSX.InputHTMLAttributes, 'type'> {
  id?: string;
  name?: string;
  label?: string;
}

// COMPONENTS
export interface CallToAction extends BetterOmit<HTMLAttributes<'a'>, 'slot'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  text?: string;
  icon?: IconElement;
  classes?: Partial<Classes>;
  type?: 'button' | 'submit' | 'reset';
}

export interface ItemGrid {
  items?: Item[];
  columns?: number;
  classes?: Partial<Classes>;
}

export type ItemList = BetterOmit<ItemGrid, 'columns'>;

export interface Form {
  inputs?: ((Input | Select) & { description?: string })[];
  textarea?: Textarea;
  disclaimers?: Disclaimer[];
  button?: CallToAction;
  description?: string;
  formProps?: astroHTML.JSX.FormHTMLAttributes;
}

// WIDGETS
export interface Hero extends BetterOmit<Headline, 'classes'>, BetterOmit<Widget, 'isDark' | 'classes'> {
  content?: string;
  actions?: string | CallToAction[];
  image?: ExtendedImageProps;
}

export interface Timeline {
  items?: Item[];
  classes?: Partial<Classes>;
}

export interface Pricing extends BetterOmit<Headline, 'classes'>, Widget {
  prices?: Array<Price>;
}

export interface Testimonials extends BetterOmit<Headline, 'classes'>, Widget {
  testimonials?: Testimonial[];
  callToAction?: CallToAction;
}

export interface SponsorInfo {
  category: string;
  brands: (ExtendedImageProps & { href?: string; description?: string })[];
}
export interface Brands extends BetterOmit<Headline, 'classes'>, Widget {
  icons?: IconElement[];
  description?: boolean;
  image_footer?: boolean;
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

export interface Steps extends BetterOmit<Headline, 'classes'>, Widget {
  items: Item[];
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
  callsToAction?: CallToAction[];
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

export type BareCall = {
  layout: string;
  title: string;
  order: int;
  showHeading: boolean;
  importantDates: Record<string, string>;
};

export type CallForPapers = MarkdownInstance<BareCall>;

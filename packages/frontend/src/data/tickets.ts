import ITablerX from 'virtual:icons/tabler/x';
import IClarityInfoStandardLine from 'virtual:icons/clarity/info-standard-line';
import type { Price } from '@/types';

const currency = '€';
const disadvantage = {
  icon: ITablerX,
  classes: {
    icon: 'bg-red-500'
  }
};
const neutral = {
  icon: IClarityInfoStandardLine,
  classes: {
    icon: 'bg-slate-500'
  }
};

export default [
  {
    title: 'Workshops Only',
    pricing: [
      {
        price: 240,
        currency,
        period: 'until 15th January 2025'
      },
      {
        price: 280,
        currency,
        period: 'between 16th January 2025 and 14th July 2025',
        variant: 'secondary'
      },
      {
        price: 350,
        currency,
        period: 'between 15th July 2025 and 15th August 2025',
        variant: 'secondary'
      }
    ],
    items: [
      {
        title: 'All workshop sessions',
        description: '1st of September'
      },
      {
        title: 'All conference sessions',
        description: '2nd-4th of September',
        ...disadvantage
      },
      {
        title: 'Reception',
        description: '1st of September'
      },
      {
        title: 'Guided tour',
        description: '2nd of September',
        ...disadvantage
      },
      {
        title: 'Conference dinner',
        description: '3rd of September',
        ...disadvantage
      },
      {
        title: 'Conference bag'
      }
    ]
  },
  {
    title: 'Conference only',
    pricing: [
      {
        price: 550,
        currency,
        period: 'until 15th January 2025'
      },
      {
        price: 600,
        currency,
        period: 'between 16th January 2025 and 14th July 2025',
        variant: 'secondary'
      },
      {
        price: 650,
        currency,
        period: 'between 15th July 2025 and 15th August 2025',
        variant: 'secondary'
      }
    ],
    items: [
      {
        title: 'All workshop sessions',
        description: '1st of September',
        ...disadvantage
      },
      {
        title: 'All conference sessions',
        description: '2nd-4th of September'
      },
      {
        title: 'Reception',
        description: '1st of September'
      },
      {
        title: 'Guided tour',
        description: '2nd of September'
      },
      {
        title: 'Conference dinner',
        description: '3rd of September'
      },
      {
        title: 'Conference bag'
      }
    ]
  },
  {
    title: 'Conference + Workshops',
    pricing: [
      {
        price: 650,
        currency,
        period: 'until 15th January 2025'
      },
      {
        price: 700,
        currency,
        period: 'between 16th January 2025 and 14th July 2025',
        variant: 'secondary'
      },
      {
        price: 750,
        currency,
        period: 'between 15th July 2025 and 15th August 2025',
        variant: 'secondary'
      }
    ],
    ribbonTitle: 'Best value',
    items: [
      {
        title: 'All workshop sessions',
        description: '1st of September'
      },
      {
        title: 'All conference sessions',
        description: '2nd-4th of September'
      },
      {
        title: 'Reception',
        description: '1st of September'
      },
      {
        title: 'Guided tour',
        description: '2nd of September'
      },
      {
        title: 'Conference dinner',
        description: '3rd of September'
      },
      {
        title: 'Conference bag'
      }
    ]
  },
  {
    title: 'Day ticket',
    pricing: [
      {
        price: 400,
        currency,
        period: 'until 15th August 2025'
      }
    ],
    items: [
      {
        title: 'Conference sessions',
        description: 'Only the day of the ticket',
        ...neutral
      },
      {
        title: 'Social event',
        description: 'Only the day of the ticket',
        ...neutral
      }
    ]
  }
] satisfies Price[];
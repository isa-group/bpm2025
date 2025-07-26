import { getPermalink } from '#/utils/permalinks';
import { program_overviews, program_name_to_uri } from '#/data/program';
import type { ScheduleEvent } from '#/types';
import { locations } from '#/data/program/locations';

export const conferenceDescription = 'Research track, BPM Forum, Journal First Track, Educators Forum, Tutorials and Process Technology Forum';
export const general_events: ScheduleEvent[] = [
  // 31 de Agosto
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 9, 0),
    end: new Date(2025, 7, 31, 10, 30),
    category: 'consortium'
  },
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 11, 0),
    end: new Date(2025, 7, 31, 12, 30),
    category: 'consortium'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 7, 31, 12, 30),
    end: new Date(2025, 7, 31, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 14, 0),
    end: new Date(2025, 7, 31, 15, 30),
    category: 'consortium'
  },
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 16, 0),
    end: new Date(2025, 7, 31, 17, 30),
    category: 'consortium'
  },
  // 1 de Septiembre
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'workshop'
  },
  {
    title: 'Coffee break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch'
  },
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'workshop'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'workshop'
  },
  {
    title: 'Coffee break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch'
  },
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'workshop'
  },
  {
    title: 'Reception cocktail',
    start: new Date(2025, 8, 1, 19, 0),
    end: new Date(2025, 8, 1, 22, 0),
    location: locations.tobbaco,
    category: 'social',
    href: getPermalink('/program/social-events/#welcome-reception')
  },

  // 2 de Septiembre
  {
    title: 'Opening Ceremony',
    start: new Date(2025, 8, 2, 9, 0),
    end: new Date(2025, 8, 2, 9, 30),
    category: 'conference_2',
    locations: locations.giralda
  },
  {
    title: 'Keynote: Shazia Sadiq',
    start: new Date(2025, 8, 2, 9, 30),
    end: new Date(2025, 8, 2, 10, 30),
    location: locations.giralda,
    category: 'keynote',
    href: getPermalink('/program/keynotes/#shazia')
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 2, 10, 30),
    end: new Date(2025, 8, 2, 11, 0),
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    category: 'conference_1',
    description: conferenceDescription
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 2, 12, 30),
    end: new Date(2025, 8, 2, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 2, 14, 0),
    end: new Date(2025, 8, 2, 15, 30),
    category: 'conference_1',
    description: conferenceDescription
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 2, 16, 0),
    end: new Date(2025, 8, 2, 17, 30),
    category: 'conference_1',
    description: conferenceDescription
  },
  {
    title: 'Guided tour',
    start: new Date(2025, 8, 2, 20, 0),
    end: new Date(2025, 8, 2, 21, 30),
    location: locations['reales-alcazares'],
    category: 'social',
    href: getPermalink('/program/social-events/#guided-tour')
  },
  // 3 de Septiembre
  {
    title: 'Keynote: Josep Carmona',
    start: new Date(2025, 8, 3, 9, 30),
    end: new Date(2025, 8, 3, 10, 30),
    location: locations.giralda,
    category: 'keynote',
    href: getPermalink('/program/keynotes/#josep')
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 3, 10, 30),
    end: new Date(2025, 8, 3, 11, 0),
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 3, 11, 0),
    end: new Date(2025, 8, 3, 13, 0),
    category: 'conference_1',
    description: conferenceDescription
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 3, 12, 30),
    end: new Date(2025, 8, 3, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 3, 14, 0),
    end: new Date(2025, 8, 3, 15, 30),
    category: 'conference_1',
    description: conferenceDescription
  },
  {
    title: 'Demos',
    start: new Date(2025, 8, 3, 16, 0),
    end: new Date(2025, 8, 3, 17, 30),
    category: 'demos'
  },
  {
    title: 'Conference dinner',
    start: new Date(2025, 8, 3, 20, 0),
    end: new Date(2025, 8, 3, 23, 0),
    location: locations.abades,
    category: 'social',
    href: getPermalink('/program/social-events/#conference-dinner')
  },

  // 4 de Septiembre
  {
    title: 'Keynote: Pernille Bjørn',
    start: new Date(2025, 8, 4, 9, 30),
    end: new Date(2025, 8, 4, 10, 30),
    location: locations.giralda,
    category: 'keynote',
    href: getPermalink('/program/keynotes/#pernille')
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 4, 10, 30),
    end: new Date(2025, 8, 4, 11, 0),
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 4, 11, 0),
    end: new Date(2025, 8, 4, 13, 0),
    category: 'conference_1',
    description: conferenceDescription
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 4, 12, 30),
    end: new Date(2025, 8, 4, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 4, 14, 0),
    end: new Date(2025, 8, 4, 15, 30),
    category: 'conference_1',
    description: conferenceDescription
  },
  {
    title: 'Panel',
    start: new Date(2025, 8, 4, 16, 0),
    end: new Date(2025, 8, 4, 17, 30),
    category: 'demos'
  },
  {
    title: 'Closing',
    start: new Date(2025, 8, 4, 17, 30),
    end: new Date(2025, 8, 4, 18, 0),
    category: 'conference_1'
  },
  {
    title: 'Farewell Party',
    start: new Date(2025, 8, 4, 19, 30),
    end: new Date(2025, 8, 4, 21, 0),
    category: 'social',
    location: locations.raza,
    href: getPermalink('/program/social-events/#farewell-party')
  },

  // 31 de Agosto
  {
    title: 'BPM in Public Administration (Spanish)',
    start: new Date(2025, 8, 5, 9, 0),
    end: new Date(2025, 8, 5, 13, 0),
    category: 'conference_2'
  },
  {
    title: 'Cocktail',
    start: new Date(2025, 8, 5, 13, 0),
    end: new Date(2025, 8, 5, 14, 0),
    category: 'lunch'
  }
].map((event) => {
  const overview = program_overviews.find(o => o.name === event.title);

  if (overview) {
    Object.assign(event, {
      href: getPermalink(`/program/${program_name_to_uri(overview.name)}`)
    });
  }

  if (event.category === 'workshop') {
    Object.assign(event, {
      href: getPermalink('#workshops')
    });
  }

  if (event.title === 'Conference') {
    Object.assign(event, {
      href: getPermalink('#conference')
    });
  }

  return event as ScheduleEvent;
});

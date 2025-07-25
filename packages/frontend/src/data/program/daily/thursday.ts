import { type ScheduleEvent, locations } from './day';

export const thursdayEvents: ScheduleEvent[] = [
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 4, 13, 0),
    end: new Date(2025, 8, 4, 14, 30),
    category: 'lunch',
    full: true
  },
  {
    title: 'Keynote: Pernille Björn',
    start: new Date(2025, 8, 4, 9, 30),
    end: new Date(2025, 8, 4, 10, 30),
    category: 'keynote',
    location: locations.giralda
  },
  {
    title: 'Main Track 6',
    start: new Date(2025, 8, 4, 11, 0),
    end: new Date(2025, 8, 4, 13, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'Main Track 7',
    start: new Date(2025, 8, 4, 14, 30),
    end: new Date(2025, 8, 4, 16, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'BPM Forum 3',
    start: new Date(2025, 8, 4, 11, 0),
    end: new Date(2025, 8, 4, 13, 0),
    category: 'bpm_forum',
    location: locations.arenal
  },
  {
    title: 'Tutorials 3',
    start: new Date(2025, 8, 4, 14, 30),
    end: new Date(2025, 8, 4, 16, 0),
    category: 'workshop',
    location: locations.arenal
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 4, 10, 30),
    end: new Date(2025, 8, 4, 11, 0),
    category: 'lunch',
    full: true
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 4, 16, 0),
    end: new Date(2025, 8, 4, 16, 30),
    category: 'lunch',
    full: true
  },
  {
    title: 'Responsible BPM 1',
    start: new Date(2025, 8, 4, 11, 0),
    end: new Date(2025, 8, 4, 13, 0),
    category: 'forum_3',
    location: locations.nervion
  },
  {
    title: 'Responsible BPM 2',
    start: new Date(2025, 8, 4, 14, 30),
    end: new Date(2025, 8, 4, 16, 0),
    category: 'forum_3',
    location: locations.nervion
  },
  {
    title: 'Panel and Closing Ceremony',
    start: new Date(2025, 8, 4, 16, 30),
    end: new Date(2025, 8, 4, 18, 0),
    category: 'keynote',
    location: locations.giralda
  },
  {
    title: 'Farewell Party',
    start: new Date(2025, 8, 4, 19, 30),
    end: new Date(2025, 8, 4, 21, 0),
    href: '/program/social-events/',
    category: 'social',
    location: locations.raza,
    full: true
  }
];

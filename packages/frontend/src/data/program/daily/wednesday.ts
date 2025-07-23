import { type ScheduleEvent, locations } from './day';

export const wednesdayEvents: ScheduleEvent[] = [
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 3, 12, 30),
    end: new Date(2025, 8, 3, 14, 0),
    category: 'lunch',
    full: true
  },
  {
    title: 'Keynote',
    start: new Date(2025, 8, 3, 9, 0),
    end: new Date(2025, 8, 3, 10, 0),
    category: 'keynote',
    location: locations.estepa
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 3, 10, 30),
    end: new Date(2025, 8, 3, 12, 30),
    category: 'conference_1',
    location: locations.estepa
  },
  {
    title: 'Demos',
    start: new Date(2025, 8, 3, 14, 0),
    end: new Date(2025, 8, 3, 15, 30),
    category: 'conference_2',
    location: locations.estepa
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 3, 16, 0),
    end: new Date(2025, 8, 3, 17, 30),
    category: 'conference_1',
    location: locations.estepa
  },
  {
    title: 'Process Technology Forum',
    start: new Date(2025, 8, 3, 10, 30),
    end: new Date(2025, 8, 3, 12, 30),
    category: 'forum_2',
    location: locations.nervion
  },
  {
    title: 'Process Technology Forum',
    start: new Date(2025, 8, 3, 14, 0),
    end: new Date(2025, 8, 3, 15, 30),
    category: 'forum_2',
    location: locations.nervion
  },
  {
    title: 'Conference Dinner',
    start: new Date(2025, 8, 3, 20, 0),
    end: new Date(2025, 8, 3, 23, 0),
    location: locations.abades,
    href: '/program/social-events/',
    category: 'social',
    full: true
  }
];

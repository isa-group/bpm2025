import { type ScheduleEvent, locations } from './day';

export const thursdayEvents: ScheduleEvent[] = [
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 4, 12, 30),
    end: new Date(2025, 8, 4, 14, 0),
    category: 'lunch',
    full: true
  },
  {
    title: 'Keynote',
    start: new Date(2025, 8, 4, 9, 0),
    end: new Date(2025, 8, 4, 10, 0),
    category: 'keynote',
    location: locations.estepa
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 4, 10, 30),
    end: new Date(2025, 8, 4, 12, 30),
    category: 'conference_1',
    location: locations.estepa
  },
  {
    title: 'Panel',
    start: new Date(2025, 8, 4, 16, 0),
    end: new Date(2025, 8, 4, 17, 30),
    category: 'conference_2',
    location: locations.estepa
  },
  {
    title: 'Closing',
    start: new Date(2025, 8, 4, 17, 30),
    end: new Date(2025, 8, 4, 18, 0),
    category: 'conference_1',
    location: locations.estepa
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 4, 14, 0),
    end: new Date(2025, 8, 4, 15, 30),
    category: 'conference_1',
    location: locations.estepa
  },
  {
    title: 'Responsible BPM Forum',
    start: new Date(2025, 8, 4, 10, 30),
    end: new Date(2025, 8, 4, 12, 30),
    category: 'forum_3',
    location: locations.nervion
  },
  {
    title: 'Responsible BPM Forum',
    start: new Date(2025, 8, 4, 14, 0),
    end: new Date(2025, 8, 4, 15, 30),
    category: 'forum_3',
    location: locations.nervion
  },
  {
    title: 'Farewell',
    start: new Date(2025, 8, 4, 19, 30),
    end: new Date(2025, 8, 4, 21, 0),
    href: '/program/social-events/',
    category: 'social',
    full: true
  }
];

import { type ScheduleEvent, locations } from './day';

export const wednesdayEvents: ScheduleEvent[] = [
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 3, 13, 0),
    end: new Date(2025, 8, 3, 14, 30),
    category: 'lunch',
    full: true
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 3, 10, 30),
    end: new Date(2025, 8, 3, 11, 0),
    category: 'lunch',
    full: true
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 3, 16, 0),
    end: new Date(2025, 8, 3, 16, 30),
    category: 'lunch',
    full: true
  },
  {
    title: 'Keynote: Josep Carmona',
    start: new Date(2025, 8, 3, 9, 30),
    end: new Date(2025, 8, 3, 10, 30),
    category: 'keynote',
    location: locations.giralda,
    href: '/program/keynotes'
  },
  {
    title: 'Main Track 4',
    start: new Date(2025, 8, 3, 11, 0),
    end: new Date(2025, 8, 3, 13, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'Main Track 5',
    start: new Date(2025, 8, 3, 14, 30),
    end: new Date(2025, 8, 3, 16, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'BPM Forum 2',
    start: new Date(2025, 8, 3, 11, 0),
    end: new Date(2025, 8, 3, 13, 0),
    category: 'bpm_forum',
    location: locations.arenal
  },
  {
    title: 'Tutorials 2',
    start: new Date(2025, 8, 3, 14, 30),
    end: new Date(2025, 8, 3, 16, 0),
    category: 'workshop',
    location: locations.arenal
  },
  {
    title: 'Industry Forum 1',
    start: new Date(2025, 8, 3, 11, 0),
    end: new Date(2025, 8, 3, 13, 0),
    category: 'forum_2',
    location: locations.nervion
  },
  {
    title: 'Industry Forum 2',
    start: new Date(2025, 8, 3, 14, 30),
    end: new Date(2025, 8, 3, 16, 0),
    category: 'forum_2',
    location: locations.nervion
  },
  {
    title: 'Celonis Tutorial',
    start: new Date(2025, 8, 3, 16, 30),
    end: new Date(2025, 8, 3, 18, 0),
    category: 'forum_1',
    location: locations.nervion
  },
  {
    title: 'Demos',
    start: new Date(2025, 8, 3, 16, 30),
    end: new Date(2025, 8, 3, 18, 0),
    category: 'demos',
    location: locations.sta_cruz
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

import { type ScheduleEvent, locations } from './day';

export const tuesdayEvents: ScheduleEvent[] = [
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 2, 13, 0),
    end: new Date(2025, 8, 2, 14, 30),
    category: 'lunch',
    full: true
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 2, 10, 30),
    end: new Date(2025, 8, 2, 11, 0),
    category: 'lunch',
    full: true
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 2, 16, 0),
    end: new Date(2025, 8, 2, 16, 30),
    category: 'lunch',
    full: true
  },
  {
    title: 'Opening Ceremony',
    start: new Date(2025, 8, 2, 9, 0),
    end: new Date(2025, 8, 2, 9, 30),
    category: 'keynote',
    location: locations.giralda
  },
  {
    title: 'Keynote: Shazia Sadiq',
    start: new Date(2025, 8, 2, 9, 30),
    end: new Date(2025, 8, 2, 10, 30),
    category: 'keynote',
    location: locations.giralda,
    href: '/program/keynotes'
  },
  {
    title: 'Main Track 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'Main Track 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'Main Track 3',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'BPM Forum 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    category: 'bpm_forum',
    location: locations.arenal
  },
  {
    title: 'Educators Forum 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'forum_1',
    location: locations.arenal
  },
  {
    title: 'Educators Forum 3',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'forum_1',
    location: locations.arenal
  },
  {
    title: 'Process Technology 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    category: 'objects',
    location: locations.nervion
  },
  {
    title: 'Process Technology 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'objects',
    location: locations.nervion
  },
  {
    title: 'Tutorials 1',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'workshop',
    location: locations.nervion
  },
  {
    title: 'Educators Forum 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    category: 'forum_1',
    location: locations.triana
  },
  {
    title: 'Journal First 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'journal_first',
    location: locations.triana
  },
  {
    title: 'Journal First 3',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'journal_first',
    location: locations.triana
  },
  {
    title: 'Journal First 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    category: 'journal_first',
    location: locations.estepa
  },
  {
    title: 'SC Meeting',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'consortium',
    location: locations.estepa
  },
  {
    title: 'SC Meeting',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'consortium',
    location: locations.estepa
  },
  {
    title: 'Guided Tour of Reales Alcázares',
    start: new Date(2025, 8, 2, 20, 0),
    end: new Date(2025, 8, 2, 21, 30),
    location: locations['reales-alcazares'],
    href: '/program/social-events/',
    category: 'social',
    full: true
  }
];

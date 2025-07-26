import type { ScheduleEvent } from '#/types';
import { locations } from '#/data/program/locations';

export const conference: ScheduleEvent[] = [
  {
    title: 'Main Track 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
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
    title: 'Process Technology 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    category: 'objects',
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
    title: 'Journal First 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    category: 'journal_first',
    location: locations.estepa
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 2, 13, 0),
    end: new Date(2025, 8, 2, 14, 30),
    category: 'lunch'
  },
  {
    title: 'Main Track 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'Educators Forum 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'forum_1',
    location: locations.arenal
  },
  {
    title: 'Process Technology 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'objects',
    location: locations.nervion
  },
  {
    title: 'Journal First 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'journal_first',
    location: locations.triana
  },
  {
    title: 'SC Meeting',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'consortium',
    location: locations.estepa
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 2, 16, 0),
    end: new Date(2025, 8, 2, 16, 30),
    category: 'lunch'
  },
  {
    title: 'Main Track 3',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'Educators Forum 3',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'forum_1',
    location: locations.arenal
  },
  {
    title: 'Tutorials 1',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'workshop',
    location: locations.nervion
  },
  {
    title: 'Journal First 3',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'journal_first',
    location: locations.triana
  },
  {
    title: 'SC Meeting',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'consortium',
    location: locations.estepa
  },
  {
    title: 'Main Track 4',
    start: new Date(2025, 8, 3, 11, 0),
    end: new Date(2025, 8, 3, 13, 0),
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
    title: 'Industry Forum 1',
    start: new Date(2025, 8, 3, 11, 0),
    end: new Date(2025, 8, 3, 13, 0),
    category: 'forum_2',
    location: locations.nervion
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 3, 13, 0),
    end: new Date(2025, 8, 3, 14, 30),
    category: 'lunch'
  },
  {
    title: 'Main Track 5',
    start: new Date(2025, 8, 3, 14, 30),
    end: new Date(2025, 8, 3, 16, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'Tutorials 2',
    start: new Date(2025, 8, 3, 14, 30),
    end: new Date(2025, 8, 3, 16, 0),
    category: 'workshop',
    location: locations.arenal
  },
  {
    title: 'Industry Forum 2',
    start: new Date(2025, 8, 3, 14, 30),
    end: new Date(2025, 8, 3, 16, 0),
    category: 'forum_2',
    location: locations.nervion
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 3, 16, 0),
    end: new Date(2025, 8, 3, 16, 30),
    category: 'lunch'
  },
  {
    title: 'Celonis Tutorial',
    start: new Date(2025, 8, 3, 16, 30),
    end: new Date(2025, 8, 3, 18, 0),
    category: 'forum_1',
    location: locations.nervion
  },
  {
    title: 'Main Track 6',
    start: new Date(2025, 8, 4, 11, 0),
    end: new Date(2025, 8, 4, 13, 0),
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
    title: 'Responsible BPM 1',
    start: new Date(2025, 8, 4, 11, 0),
    end: new Date(2025, 8, 4, 13, 0),
    category: 'forum_3',
    location: locations.nervion
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 4, 13, 0),
    end: new Date(2025, 8, 4, 14, 30),
    category: 'lunch'
  },
  {
    title: 'Main Track 7',
    start: new Date(2025, 8, 4, 14, 30),
    end: new Date(2025, 8, 4, 16, 0),
    category: 'conference_1',
    location: locations.giralda
  },
  {
    title: 'Tutorials 3',
    start: new Date(2025, 8, 4, 14, 30),
    end: new Date(2025, 8, 4, 16, 0),
    category: 'workshop',
    location: locations.arenal
  },
  {
    title: 'Responsible BPM 2',
    start: new Date(2025, 8, 4, 14, 30),
    end: new Date(2025, 8, 4, 16, 0),
    category: 'forum_3',
    location: locations.nervion
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 4, 16, 0),
    end: new Date(2025, 8, 4, 16, 30),
    category: 'lunch'
  }
];

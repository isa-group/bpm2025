import { type ScheduleEvent, locations } from './day';

export const fridayEvents: ScheduleEvent[] = [
  {
    title: 'Cocktail',
    start: new Date(2025, 8, 5, 13, 0),
    end: new Date(2025, 8, 5, 14, 0),
    category: 'lunch',
    full: true
  },
  {
    title: 'BPM in Public Administration (Spanish)',
    start: new Date(2025, 8, 5, 9, 0),
    end: new Date(2025, 8, 5, 13, 0),
    category: 'conference_1',
    location: locations.estepa
  }
];

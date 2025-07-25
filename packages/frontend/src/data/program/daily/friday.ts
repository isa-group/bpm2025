import { type ScheduleEvent, locations } from './day';

export const fridayEvents: ScheduleEvent[] = [
  {
    title: 'Cocktail and Networking',
    start: new Date(2025, 8, 5, 13, 30),
    end: new Date(2025, 8, 5, 14, 30),
    category: 'lunch',
    full: true
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 5, 10, 15),
    end: new Date(2025, 8, 5, 10, 45),
    category: 'lunch',
    full: true
  },
  {
    title: 'Invited Talk: ADA Representative (Spanish)',
    start: new Date(2025, 8, 5, 9, 15),
    end: new Date(2025, 8, 5, 10, 15),
    category: 'conference_1',
    location: locations.estepa
  },
  {
    title: 'Real Cases of Process Automation and Improvement (Spanish)',
    start: new Date(2025, 8, 5, 10, 45),
    end: new Date(2025, 8, 5, 12, 15),
    category: 'conference_1',
    location: locations.estepa
  },
  {
    title: 'Process Mining in Public Administration (Spanish)',
    start: new Date(2025, 8, 5, 12, 15),
    end: new Date(2025, 8, 5, 12, 45),
    category: 'conference_1',
    location: locations.estepa
  },
  {
    title: 'Round Table: AI, RPA, and Automation in Action (Spanish)',
    start: new Date(2025, 8, 5, 12, 45),
    end: new Date(2025, 8, 5, 13, 30),
    category: 'conference_1',
    location: locations.estepa
  }
];

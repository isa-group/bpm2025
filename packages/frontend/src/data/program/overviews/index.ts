import { workshops } from './sections/workshops';
import { conferenceDescription, general_events } from './sections/general';
import { conference } from './sections/conference';
import type { Headline, ScheduleEvent } from '#/types';

export interface Sections extends Headline {
  events: ScheduleEvent[];
}

export const sections: Sections[] = [
  {
    title: 'General Schedule',
    events: general_events
  },
  {
    title: 'Workshops',
    tagline: 'Monday, 1st September 2025',
    events: workshops
  },
  {
    title: 'Conference',
    tagline: 'Tuesday, 2nd - Thursday, 4th<br />September 2025',
    subtitle: conferenceDescription,
    events: conference
  }
];

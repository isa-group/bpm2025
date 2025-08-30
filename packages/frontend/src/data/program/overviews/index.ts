import { workshops } from './sections/workshops';
import { conferenceDescription, general_events } from './sections/general';
import { conferenceFirst, conferenceSecond, conferenceThird } from './sections/conference';
import type { Headline, ScheduleEvent } from '#/types';

export interface Sections extends Headline {
  events: ScheduleEvent[];
  split?: ScheduleEvent[][];
}

/**
 * Splits events into two groups based on location.
 *
 * @param events - full array of ScheduleEvent
 * @param groups - configuration with two arrays of locations
 * @returns an object with { groupA, groupB }
 */
export function splitByLocation(
  events: ScheduleEvent[],
  groups: { groupA: string[]; groupB: string[] }
): ScheduleEvent[][] {
  const groupA: ScheduleEvent[] = [];
  const groupB: ScheduleEvent[] = [];

  for (const e of events) {
    const loc = e.location as string;
    if (groups.groupA.includes(loc)) {
      groupA.push(e);
    } else if (groups.groupB.includes(loc)) {
      groupB.push(e);
    }
    // you could also add an `else` branch if you want to catch unclassified
  }

  return [groupA, groupB];
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
    events: conferenceFirst.concat(conferenceSecond, conferenceThird),
    split: [
      conferenceFirst,
      conferenceSecond,
      conferenceThird
    ]

  }
];

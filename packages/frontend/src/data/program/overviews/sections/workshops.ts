import { getPermalink } from '#/utils/permalinks';
import type { ScheduleEvent } from '#/types';
import { locations } from '#/data/program/locations';

// --- Category constants ---
export const WORKSHOPS = {
  AI4BPM: 'ai4bpm',
  AUTOMATE: 'automate',
  VIPRA: 'vipra',
  BPMEETIOT: 'bpmeetiot',
  PRODY: 'prody',
  OBJECTS: 'objects',
  NLP4BPM: 'nlp4bpm',
  INNOV8BPM: 'innov8bpm',
  DLT4BPM: 'dlt4bpm',
  PLC: 'plc',
  FMBPM: 'fmbpm'
} as const;

export type WorkshopCategory = typeof WORKSHOPS[keyof typeof WORKSHOPS];

/**
 * Converts workshop and session in permalink
 */
function getWorkshopHref(category: WorkshopCategory, sessionIndex: number) {
  return getPermalink(`/program/workshops/#${category}-s${sessionIndex}`);
}

export const workshops: ScheduleEvent[] = [
  {
    title: 'AI4BPM I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: WORKSHOPS.AI4BPM,
    location: locations.estepa,
    href: getWorkshopHref(WORKSHOPS.AI4BPM, 1)
  },
  {
    title: 'AUTOMATE I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: WORKSHOPS.AUTOMATE,
    location: locations.ecija,
    href: getWorkshopHref(WORKSHOPS.AUTOMATE, 1)
  },
  {
    title: 'VIPRA I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: WORKSHOPS.VIPRA,
    location: locations.prado,
    href: getWorkshopHref(WORKSHOPS.VIPRA, 1)
  },
  {
    title: 'BP-Meet-IoT I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: WORKSHOPS.BPMEETIOT,
    location: locations.lebrija,
    href: getWorkshopHref(WORKSHOPS.BPMEETIOT, 1)
  },
  {
    title: 'Prody I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: WORKSHOPS.PRODY,
    location: locations.utrera,
    href: getWorkshopHref(WORKSHOPS.PRODY, 1)
  },
  {
    title: 'OBJECTS I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: WORKSHOPS.OBJECTS,
    location: locations.triana,
    href: getWorkshopHref(WORKSHOPS.OBJECTS, 1)
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch',
    location: locations.estepa
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch',
    location: locations.ecija
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch',
    location: locations.prado
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch',
    location: locations.lebrija
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch',
    location: locations.utrera
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch',
    location: locations.triana
  },
  {
    title: 'AI4BPM II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: WORKSHOPS.AI4BPM,
    location: locations.estepa,
    href: getWorkshopHref(WORKSHOPS.AI4BPM, 2)
  },
  {
    title: 'AUTOMATE II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: WORKSHOPS.AUTOMATE,
    location: locations.ecija,
    href: getWorkshopHref(WORKSHOPS.AUTOMATE, 2)
  },
  {
    title: 'VIPRA II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: WORKSHOPS.VIPRA,
    location: locations.prado,
    href: getWorkshopHref(WORKSHOPS.VIPRA, 2)
  },
  {
    title: 'BP-Meet-IoT II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: WORKSHOPS.BPMEETIOT,
    location: locations.lebrija,
    href: getWorkshopHref(WORKSHOPS.BPMEETIOT, 2)
  },
  {
    title: 'Prody II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: WORKSHOPS.PRODY,
    location: locations.utrera,
    href: getWorkshopHref(WORKSHOPS.PRODY, 2)
  },
  {
    title: 'OBJECTS II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: WORKSHOPS.OBJECTS,
    location: locations.triana,
    href: getWorkshopHref(WORKSHOPS.OBJECTS, 2)
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    category: 'lunch',
    location: locations.estepa
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    category: 'lunch',
    location: locations.ecija
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    category: 'lunch',
    location: locations.prado
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    category: 'lunch',
    location: locations.lebrija
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    category: 'lunch',
    location: locations.utrera
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    category: 'lunch',
    location: locations.triana
  },
  {
    title: 'AI4BPM III',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: WORKSHOPS.AI4BPM,
    location: locations.estepa,
    href: getWorkshopHref(WORKSHOPS.AI4BPM, 3)
  },
  {
    title: 'AUTOMATE III',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: WORKSHOPS.AUTOMATE,
    location: locations.ecija,
    href: getWorkshopHref(WORKSHOPS.AUTOMATE, 3)
  },
  {
    title: 'NLP4BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: WORKSHOPS.NLP4BPM,
    location: locations.prado,
    href: getWorkshopHref(WORKSHOPS.NLP4BPM, 1)
  },
  {
    title: 'Innov8BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: WORKSHOPS.INNOV8BPM,
    location: locations.lebrija,
    href: getWorkshopHref(WORKSHOPS.INNOV8BPM, 1)
  },
  {
    title: 'DLT4BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: WORKSHOPS.DLT4BPM,
    location: locations.utrera,
    href: getWorkshopHref(WORKSHOPS.DLT4BPM, 1)
  },
  {
    title: 'PLC I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: WORKSHOPS.PLC,
    location: locations.triana,
    href: getWorkshopHref(WORKSHOPS.PLC, 1)
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch'
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch',
    location: locations.ecija
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch',
    location: locations.prado
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch',
    location: locations.lebrija
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch',
    location: locations.utrera
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch',
    location: locations.triana
  },
  {
    title: 'OBJECTS III Review Session',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: WORKSHOPS.OBJECTS,
    description: 'Invitation only',
    location: locations.estepa,
    href: getWorkshopHref(WORKSHOPS.OBJECTS, 3)
  },
  {
    title: 'FM-BPM',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: WORKSHOPS.FMBPM,
    location: locations.ecija,
    href: getWorkshopHref(WORKSHOPS.FMBPM, 1)
  },
  {
    title: 'NLP4BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: WORKSHOPS.NLP4BPM,
    location: locations.prado,
    href: getWorkshopHref(WORKSHOPS.NLP4BPM, 2)
  },
  {
    title: 'Innov8BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: WORKSHOPS.INNOV8BPM,
    location: locations.lebrija,
    href: getWorkshopHref(WORKSHOPS.INNOV8BPM, 2)
  },
  {
    title: 'DLT4BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: WORKSHOPS.DLT4BPM,
    location: locations.utrera,
    href: getWorkshopHref(WORKSHOPS.DLT4BPM, 2)
  },
  {
    title: 'PLC II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: WORKSHOPS.PLC,
    location: locations.triana,
    href: getWorkshopHref(WORKSHOPS.PLC, 2)
  }
];

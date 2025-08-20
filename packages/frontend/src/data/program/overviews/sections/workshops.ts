import { getPermalink } from '#/utils/permalinks';
import type { ScheduleEvent } from '#/types';
import { locations } from '#/data/program/locations';

// --- Category constants ---
export const CATEGORIES = {
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

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

/**
 * Converts workshop and session in permalink
 */
function getWorkshopHref(category: Category, sessionIndex: number) {
  return getPermalink(`/program/workshops/#${category}-s${sessionIndex}`);
}

export const workshops: ScheduleEvent[] = [
  {
    title: 'AI4BPM I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: CATEGORIES.AI4BPM,
    location: locations.estepa,
    href: getWorkshopHref(CATEGORIES.AI4BPM, 1)
  },
  {
    title: 'AUTOMATE I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: CATEGORIES.AUTOMATE,
    location: locations.ecija,
    href: getWorkshopHref(CATEGORIES.AUTOMATE, 1)
  },
  {
    title: 'VIPRA I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: CATEGORIES.VIPRA,
    location: locations.prado,
    href: getWorkshopHref(CATEGORIES.VIPRA, 1)
  },
  {
    title: 'BP-Meet-IoT I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: CATEGORIES.BPMEETIOT,
    location: locations.lebrija,
    href: getWorkshopHref(CATEGORIES.BPMEETIOT, 1)
  },
  {
    title: 'Prody I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: CATEGORIES.PRODY,
    location: locations.utrera,
    href: getWorkshopHref(CATEGORIES.PRODY, 1)
  },
  {
    title: 'OBJECTS I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: CATEGORIES.OBJECTS,
    location: locations.triana,
    href: getWorkshopHref(CATEGORIES.OBJECTS, 1)
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
    category: CATEGORIES.AI4BPM,
    location: locations.estepa,
    href: getWorkshopHref(CATEGORIES.AI4BPM, 2)
  },
  {
    title: 'AUTOMATE II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: CATEGORIES.AUTOMATE,
    location: locations.ecija,
    href: getWorkshopHref(CATEGORIES.AUTOMATE, 2)
  },
  {
    title: 'VIPRA II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: CATEGORIES.VIPRA,
    location: locations.prado,
    href: getWorkshopHref(CATEGORIES.VIPRA, 2)
  },
  {
    title: 'BP-Meet-IoT II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: CATEGORIES.BPMEETIOT,
    location: locations.lebrija,
    href: getWorkshopHref(CATEGORIES.BPMEETIOT, 2)
  },
  {
    title: 'Prody II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: CATEGORIES.PRODY,
    location: locations.utrera,
    href: getWorkshopHref(CATEGORIES.PRODY, 2)
  },
  {
    title: 'OBJECTS II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: CATEGORIES.OBJECTS,
    location: locations.triana,
    href: getWorkshopHref(CATEGORIES.OBJECTS, 2)
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
    category: CATEGORIES.AI4BPM,
    location: locations.estepa,
    href: getWorkshopHref(CATEGORIES.AI4BPM, 3)
  },
  {
    title: 'AUTOMATE III',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: CATEGORIES.AUTOMATE,
    location: locations.ecija,
    href: getWorkshopHref(CATEGORIES.AUTOMATE, 3)
  },
  {
    title: 'NLP4BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: CATEGORIES.NLP4BPM,
    location: locations.prado,
    href: getWorkshopHref(CATEGORIES.NLP4BPM, 1)
  },
  {
    title: 'Innov8BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: CATEGORIES.INNOV8BPM,
    location: locations.lebrija,
    href: getWorkshopHref(CATEGORIES.INNOV8BPM, 1)
  },
  {
    title: 'DLT4BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: CATEGORIES.DLT4BPM,
    location: locations.utrera,
    href: getWorkshopHref(CATEGORIES.DLT4BPM, 1)
  },
  {
    title: 'PLC I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: CATEGORIES.PLC,
    location: locations.triana,
    href: getWorkshopHref(CATEGORIES.PLC, 1)
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
    category: CATEGORIES.OBJECTS,
    description: 'Invitation only',
    location: locations.estepa,
    href: getWorkshopHref(CATEGORIES.OBJECTS, 3)
  },
  {
    title: 'FM-BPM',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: CATEGORIES.FMBPM,
    location: locations.ecija,
    href: getWorkshopHref(CATEGORIES.FMBPM, 1)
  },
  {
    title: 'NLP4BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: CATEGORIES.NLP4BPM,
    location: locations.prado,
    href: getWorkshopHref(CATEGORIES.NLP4BPM, 2)
  },
  {
    title: 'Innov8BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: CATEGORIES.INNOV8BPM,
    location: locations.lebrija,
    href: getWorkshopHref(CATEGORIES.INNOV8BPM, 2)
  },
  {
    title: 'DLT4BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: CATEGORIES.DLT4BPM,
    location: locations.utrera,
    href: getWorkshopHref(CATEGORIES.DLT4BPM, 2)
  },
  {
    title: 'PLC II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: CATEGORIES.PLC,
    location: locations.triana,
    href: getWorkshopHref(CATEGORIES.PLC, 2)
  }
];

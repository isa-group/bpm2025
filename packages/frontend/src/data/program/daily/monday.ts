import { type ScheduleEvent, locations } from './day';

export const mondayEvents: ScheduleEvent[] = [
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    category: 'lunch',
    full: true
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch',
    full: true
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch',
    full: true
  },
  {
    title: 'AI4BPM I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'ai4bpm',
    location: locations.estepa
  },
  {
    title: 'AI4BPM II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'ai4bpm',
    location: locations.estepa
  },
  {
    title: 'AI4BPM III',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'ai4bpm',
    location: locations.estepa
  },
  {
    title: 'OBJECTS III Review Session (invitation only) ',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'objects',
    location: locations.estepa
  },
  {
    title: 'AUTOMATE I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'automate',
    location: locations.ecija
  },
  {
    title: 'AUTOMATE II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'automate',
    location: locations.ecija
  },
  {
    title: 'AUTOMATE III',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'automate',
    location: locations.ecija
  },
  {
    title: 'FM-BPM',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'fmbpm',
    location: locations.ecija
  },
  {
    title: 'VIPRA I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'vipra',
    location: locations.prado
  },
  {
    title: 'VIPRA II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'vipra',
    location: locations.prado
  },
  {
    title: 'NLP4BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'nlp4bpm',
    location: locations.prado
  },
  {
    title: 'NLP4BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'nlp4bpm',
    location: locations.prado
  },
  {
    title: 'BP-Meet-IoT I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'bpmeetiot',
    location: locations.lebrija
  },
  {
    title: 'BP-Meet-IoT II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'bpmeetiot',
    location: locations.lebrija
  },
  {
    title: 'Innov8BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'innov8bpm',
    location: locations.lebrija
  },
  {
    title: 'Innov8BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'innov8bpm',
    location: locations.lebrija
  },
  {
    title: 'Prody I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'prody',
    location: locations.utrera
  },
  {
    title: 'Prody II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'prody',
    location: locations.utrera
  },
  {
    title: 'DLT4BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'dlt4bpm',
    location: locations.utrera
  },
  {
    title: 'DLT4BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'dlt4bpm',
    location: locations.utrera
  },
  {
    title: 'OBJECTS I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'objects',
    location: locations.triana
  },
  {
    title: 'OBJECTS II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'objects',
    location: locations.triana
  },
  {
    title: 'PLC I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'plc',
    location: locations.triana
  },
  {
    title: 'PLC II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'plc',
    location: locations.triana
  },
  {
    title: 'Welcome Reception',
    start: new Date(2025, 8, 1, 19, 0),
    end: new Date(2025, 8, 1, 22, 0),
    category: 'social',
    full: true,
    location: locations.tobbaco,
    href: '/program/social-events/'
  }
];

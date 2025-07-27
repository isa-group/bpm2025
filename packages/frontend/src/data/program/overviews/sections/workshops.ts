import type { ScheduleEvent } from '#/types';
import { locations } from '#/data/program/locations';

const ai4bpmUrl = 'https://sites.google.com/unitn.it/ai4bpm-2025';
const automateUrl = 'https://sites.google.com/diag.uniroma1.it/automate-2025';
const bpMeetIotUrl = 'https://bp-meet-iot.webs.upv.es/';
const prodyUrl = 'https://prody.ai.wu.ac.at/';
const dlt4bpmUrl = 'https://dlt4bpm.github.io/';
const fmbpmUrl = 'https://fm-bpm2025.github.io/';
const innov8bpmUrl = 'https://sites.google.com/view/innov8bpm';
const nlp4bpmUrl = 'https://sites.google.com/view/nlp4bpm2025/';
const objectsUrl = 'https://sites.google.com/view/objects-workshop';
const plcUrl = 'https://plc.di.unito.it/';
const vipraUrl = 'https://vipra-workshop.github.io/homepage/';

export const workshops: ScheduleEvent[] = [
  {
    title: 'AI4BPM I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'ai4bpm',
    location: locations.estepa,
    href: ai4bpmUrl
  },
  {
    title: 'AUTOMATE I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'automate',
    location: locations.ecija,
    href: automateUrl
  },
  {
    title: 'VIPRA I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'vipra',
    location: locations.prado,
    href: vipraUrl
  },
  {
    title: 'BP-Meet-IoT I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'bpmeetiot',
    location: locations.lebrija,
    href: bpMeetIotUrl
  },
  {
    title: 'Prody I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'prody',
    location: locations.utrera,
    href: prodyUrl
  },
  {
    title: 'OBJECTS I',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'objects',
    location: locations.triana,
    href: objectsUrl
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
    category: 'ai4bpm',
    location: locations.estepa,
    href: ai4bpmUrl
  },
  {
    title: 'AUTOMATE II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'automate',
    location: locations.ecija,
    href: automateUrl
  },
  {
    title: 'VIPRA II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'vipra',
    location: locations.prado,
    href: vipraUrl
  },
  {
    title: 'BP-Meet-IoT II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'bpmeetiot',
    location: locations.lebrija,
    href: bpMeetIotUrl
  },
  {
    title: 'Prody II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'prody',
    location: locations.utrera,
    href: prodyUrl
  },
  {
    title: 'OBJECTS II',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'objects',
    location: locations.triana,
    href: objectsUrl
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
    category: 'ai4bpm',
    location: locations.estepa,
    href: ai4bpmUrl
  },
  {
    title: 'AUTOMATE III',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'automate',
    location: locations.ecija,
    href: automateUrl
  },
  {
    title: 'NLP4BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'nlp4bpm',
    location: locations.prado,
    href: nlp4bpmUrl
  },
  {
    title: 'Innov8BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'innov8bpm',
    location: locations.lebrija,
    href: innov8bpmUrl
  },
  {
    title: 'DLT4BPM I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'dlt4bpm',
    location: locations.utrera,
    href: dlt4bpmUrl
  },
  {
    title: 'PLC I',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'plc',
    location: locations.triana,
    href: plcUrl
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
    category: 'objects',
    description: 'Invitation only',
    location: locations.estepa,
    href: objectsUrl
  },
  {
    title: 'FM-BPM',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'fmbpm',
    location: locations.ecija,
    href: fmbpmUrl
  },
  {
    title: 'NLP4BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'nlp4bpm',
    location: locations.prado,
    href: nlp4bpmUrl
  },
  {
    title: 'Innov8BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'innov8bpm',
    location: locations.lebrija,
    href: innov8bpmUrl
  },
  {
    title: 'DLT4BPM II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'dlt4bpm',
    location: locations.utrera,
    href: dlt4bpmUrl
  },
  {
    title: 'PLC II',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'plc',
    location: locations.triana,
    href: plcUrl
  }
];

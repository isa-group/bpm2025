export interface ScheduleEvent {
  title: string;
  start: Date;
  end?: Date;
  description?: string;
  location?: EventLocation;
  category: 'forum_1' | 'forum_2' | 'forum_3' | 'keynote'
    | 'conference_1' | 'conference_2' | 'workshop' | 'social'
    | 'lunch' | 'demos' | 'consortium' | 'journal_first' | 'bpm_forum'
    | 'ai4bpm' | 'objects' | 'automate' | 'fmbpm' | 'vipra'
    | 'nlp4bpm' | 'bpmeetiot' | 'innov8bpm' | 'prody' | 'dlt4bpm' | 'plc';
  href?: string;
  full?: boolean;
}

export interface EventLocation {
  name: string;
  address?: string;
  url?: string;
}

export const locations: Record<string, EventLocation> = {
  'estepa': {
    name: '"Estepa" Hall'
  },
  'ecija': {
    name: '"Ecija" Hall'
  },
  'prado': {
    name: '"Prado" Hall'
  },
  'lebrija': {
    name: '"Lebrija" Hall'
  },
  'utrera': {
    name: '"Utrera" Hall'
  },
  'triana': {
    name: '"Triana" Hall'
  },
  'nervion': {
    name: '"Nervión" Hall'
  },
  'giralda': {
    name: '"Giralda" Hall'
  },
  'arenal': {
    name: '"Arenal" Hall'
  },
  'sta_cruz': {
    name: '"Santa Cruz" Hall'
  },
  'raza': {
    name: 'La Raza Puerto',
    address: 'Muelle de las Delicias, s/n. Módulo Norte, 41012 Seville, Spain',
    url: 'https://maps.app.goo.gl/1qHp5r5Qn3CZeaFDA'
  },
  'tobbaco': {
    name: 'Royal Tobacco Factory',
    address: 'C. San Fernando, 4, Casco Antiguo, 41004 Seville, Spain',
    url: 'https://maps.app.goo.gl/jGLHMfYmiFGA6Z8S9'
  },
  'reales-alcazares': {
    name: 'Reales Alcázares',
    address: 'Real Alcázar de Sevilla, Casco Antiguo, 41004 Seville, Spain',
    url: 'https://maps.app.goo.gl/xuKU7oeD8XhW5baY8'
  },
  'abades': {
    name: 'Abades Triana',
    address: 'Calle Betis, 69, 41010 Sevilla, Spain',
    url: 'https://maps.app.goo.gl/yuqcQRDw3mX9gLiL9'
  }
};

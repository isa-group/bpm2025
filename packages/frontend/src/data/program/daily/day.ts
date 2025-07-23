export interface ScheduleEvent {
    title: string;
    start: Date;
    end?: Date;
    description?: string;
    location?: EventLocation;
    category: 'forum_1' | 'forum_2' | 'forum_3' | 'keynote'
      | 'conference_1' | 'conference_2' | 'workshop' | 'social'
      | 'lunch' | 'demos' | 'consortium'
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
        name: '"Estepa" Hall',
        address: '123 Main St, City, Country',
        url: 'https://example.com/main-auditorium'
    },
    'ecija': {
        name: '"Ecija" Hall',
        address: '456 Conference Rd, City, Country',
        url: 'https://example.com/conference-room-a'
    },
    'prado': {
        name: '"Prado" Hall',
        address: '789 Workshop Ave, City, Country',
        url: 'https://example.com/workshop-hall-b'
    },
    'lebrija': {
        name: '"Lebrija" Hall',
        address: '101 Social St, City, Country',
        url: 'https://example.com/social-hall'
    },
    'utrera': {
        name: '"Utrera" Hall',
        address: '202 Demo Blvd, City, Country', 
        url: 'https://example.com/demo-hall'
    },
    'triana': {
        name: '"Triana" Hall',
        address: '303 Consortium Pl, City, Country',
        url: 'https://example.com/consortium-hall'
    },
    'nervion': {
        name: '"Nervión" Hall',
        address: '303 Consortium Pl, City, Country',
        url: 'https://example.com/consortium-hall'
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
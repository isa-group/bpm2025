import { getPermalink } from '#/utils/permalinks';
import { program_overviews, program_name_to_uri } from '#/data/program/overviews';

export interface ScheduleEvent {
  title: string;
  start: Date;
  end?: Date;
  description?: string;
  location?: string;
  category: 'forum_1' | 'forum_2' | 'forum_3' | 'keynote'
    | 'conference_1' | 'conference_2' | 'workshop' | 'social'
    | 'lunch' | 'demos' | 'consortium';
  href?: string;
}

export const events: ScheduleEvent[] = [
  // 31 de Agosto
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 9, 0),
    end: new Date(2025, 7, 31, 10, 30),
    category: 'consortium'
  },
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 11, 0),
    end: new Date(2025, 7, 31, 12, 30),
    category: 'consortium'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 7, 31, 12, 30),
    end: new Date(2025, 7, 31, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 14, 0),
    end: new Date(2025, 7, 31, 15, 30),
    category: 'consortium'
  },
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 16, 0),
    end: new Date(2025, 7, 31, 17, 30),
    category: 'consortium'
  },
  // 1 de Septiembre
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 10, 30),
    category: 'workshop',
    description: `
      <i>Session 1</i>
      <br />
      ·📍"Estepa" Hall: <b>AI4BPM I</b>
      <br />
      ·📍"Écija" Hall: <b>AUTOMATE I</b>
      <br />
      ·📍"Prado" Hall: <b>VIPRA I</b>
      <br />
      ·📍"Lebrija" Hall: <b>BP-Meet-IoT I</b>
      <br />
      ·📍"Utrera" Hall: <b>ProDy I</b>
      <br />
      ·📍"Triana" Hall: <b>OBJECTS I</b>
    `
  },
  {
    title: 'Coffee break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch'
  },
  {
    title: 'Coffee break',
    start: new Date(2025, 8, 1, 10, 30),
    end: new Date(2025, 8, 1, 11, 0),
    category: 'lunch'
  },
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 11, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'workshop',
    description: `
      <i>Session 2</i>
      <br />
      ·📍"Estepa" Hall: <b>AI4BPM II</b>
      <br />
      ·📍"Écija" Hall: <b>AUTOMATE II</b>
      <br />
      ·📍"Prado" Hall: <b>VIPRA II</b>
      <br />
      ·📍"Lebrija" Hall: <b>BP-Meet-IoT II</b>
      <br />
      ·📍"Utrera" Hall: <b>ProDy II</b>
      <br />
      ·📍"Triana" Hall: <b>OBJECTS II</b>
    `
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 15, 30),
    category: 'workshop',
    description: `
      <i>Session 3</i>
      <br />
      ·📍"Estepa" Hall: <b>AI4BPM III</b>
      <br />
      ·📍"Écija" Hall: <b>AUTOMATE III</b>
      <br />
      ·📍"Prado" Hall: <b>NLP4BPM I</b>
      <br />
      ·📍"Lebrija" Hall: <b>Innov8BPM I</b>
      <br />
      ·📍"Utrera" Hall: <b>DLT4BPM I</b>
      <br />
      ·📍"Triana" Hall: <b>PLC I</b>
    `
  },
  {
    title: 'Coffee break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch'
  },
  {
    title: 'Coffee break',
    start: new Date(2025, 8, 1, 15, 30),
    end: new Date(2025, 8, 1, 16, 0),
    category: 'lunch'
  },
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 16, 0),
    end: new Date(2025, 8, 1, 17, 30),
    category: 'workshop',
    description: `
      <i>Session 4</i>
      <br />
      ·📍"Estepa" Hall: <b>OBJECTS III Review Session (invitation only)</b>
      <br />
      ·📍"Écija" Hall: <b>FM-BPM</b>
      <br />
      ·📍"Prado" Hall: <b>NLP4BPM II</b>
      <br />
      ·📍"Lebrija" Hall: <b>Innov8BPM II</b>
      <br />
      ·📍"Utrera" Hall: <b>DLT4BPM II</b>
      <br />
      ·📍"Triana" Hall: <b>PLC II</b>
    `
  },
  {
    title: 'Reception cocktail',
    start: new Date(2025, 8, 1, 19, 0),
    end: new Date(2025, 8, 1, 22, 0),
    location: 'Royal Tobacco Factory',
    category: 'social'
  },

  // 2 de Septiembre
  {
    title: 'Keynote',
    start: new Date(2025, 8, 2, 9, 0),
    end: new Date(2025, 8, 2, 10, 0),
    category: 'keynote'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 2, 10, 30),
    end: new Date(2025, 8, 2, 12, 30),
    category: 'conference_1'
  },
  {
    title: 'Educators Forum',
    start: new Date(2025, 8, 2, 10, 30),
    end: new Date(2025, 8, 2, 12, 30),
    category: 'forum_1'
  },
  {
    title: 'Process Technology Forum',
    location: '"Nervión" Hall',
    start: new Date(2025, 8, 2, 10, 30),
    end: new Date(2025, 8, 2, 12, 30),
    category: 'forum_2'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 2, 12, 30),
    end: new Date(2025, 8, 2, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 2, 14, 0),
    end: new Date(2025, 8, 2, 15, 30),
    category: 'conference_1'
  },
  {
    title: 'Educators Forum',
    start: new Date(2025, 8, 2, 14, 0),
    end: new Date(2025, 8, 2, 15, 30),
    category: 'forum_1'
  },
  {
    title: 'Process Technology Forum',
    location: '"Nervión" Hall',
    start: new Date(2025, 8, 2, 14, 0),
    end: new Date(2025, 8, 2, 15, 30),
    category: 'forum_2'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 2, 16, 0),
    end: new Date(2025, 8, 2, 17, 30),
    category: 'conference_1'
  },
  {
    title: 'Educators Forum',
    start: new Date(2025, 8, 2, 16, 0),
    end: new Date(2025, 8, 2, 17, 30),
    category: 'forum_1'
  },
  {
    title: 'Guided tour',
    start: new Date(2025, 8, 2, 20, 0),
    end: new Date(2025, 8, 2, 21, 30),
    location: 'Reales Alcázares',
    category: 'social'
  },
  // 3 de Septiembre
  {
    title: 'Keynote',
    start: new Date(2025, 8, 3, 9, 0),
    end: new Date(2025, 8, 3, 10, 0),
    category: 'keynote'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 3, 10, 30),
    end: new Date(2025, 8, 3, 12, 30),
    category: 'conference_1'
  },
  {
    title: 'Industry & Society Forum',
    location: '"Nervión" Hall',
    start: new Date(2025, 8, 3, 10, 30),
    end: new Date(2025, 8, 3, 12, 30),
    category: 'forum_2'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 3, 12, 30),
    end: new Date(2025, 8, 3, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 3, 14, 0),
    end: new Date(2025, 8, 3, 15, 30),
    category: 'conference_1'
  },
  {
    title: 'Industry & Society Forum',
    location: '"Nervión" Hall',
    start: new Date(2025, 8, 3, 14, 0),
    end: new Date(2025, 8, 3, 15, 30),
    category: 'forum_2'
  },
  {
    title: 'Demos',
    start: new Date(2025, 8, 3, 16, 0),
    end: new Date(2025, 8, 3, 17, 30),
    category: 'demos'
  },
  {
    title: 'Conference dinner',
    start: new Date(2025, 8, 3, 20, 0),
    end: new Date(2025, 8, 3, 23, 0),
    location: 'Abades Triana',
    category: 'social'
  },

  // 4 de Septiembre
  {
    title: 'Keynote',
    start: new Date(2025, 8, 4, 9, 0),
    end: new Date(2025, 8, 4, 10, 0),
    category: 'keynote'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 4, 10, 30),
    end: new Date(2025, 8, 4, 12, 30),
    category: 'conference_1'
  },
  {
    title: 'Responsible BPM Forum',
    location: '"Nervión" Hall',
    start: new Date(2025, 8, 4, 10, 30),
    end: new Date(2025, 8, 4, 12, 30),
    category: 'forum_3'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 4, 12, 30),
    end: new Date(2025, 8, 4, 14, 0),
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 4, 14, 0),
    end: new Date(2025, 8, 4, 15, 30),
    category: 'conference_1'
  },
  {
    title: 'Responsible BPM Forum',
    location: '"Nervión" Hall',
    start: new Date(2025, 8, 4, 14, 0),
    end: new Date(2025, 8, 4, 15, 30),
    category: 'forum_3'
  },
  {
    title: 'Panel',
    start: new Date(2025, 8, 4, 16, 0),
    end: new Date(2025, 8, 4, 17, 30),
    category: 'demos'
  },
  {
    title: 'Closing',
    start: new Date(2025, 8, 4, 17, 30),
    end: new Date(2025, 8, 4, 18, 0),
    category: 'conference_1'
  },
  {
    title: 'Farewell',
    start: new Date(2025, 8, 4, 19, 30),
    end: new Date(2025, 8, 4, 21, 0),
    category: 'social'
  },

  // 31 de Agosto
  {
    title: 'BPM in Public Administration (Spanish)',
    start: new Date(2025, 8, 5, 9, 0),
    end: new Date(2025, 8, 5, 13, 0),
    category: 'conference_2'
  },
  {
    title: 'Cocktail',
    start: new Date(2025, 8, 5, 13, 0),
    end: new Date(2025, 8, 5, 14, 0),
    category: 'lunch'
  }
].map((event) => {
  const overview = program_overviews.find(o => o.name === event.title);

  if (overview) {
    Object.assign(event, {
      href: getPermalink(`/program/${program_name_to_uri(overview.name)}`)
    });
  }

  return event as ScheduleEvent;
});

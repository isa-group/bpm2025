export interface ScheduleEvent {
  title: string;
  start: Date;
  end?: Date;
  description?: string;
  location?: string;
  category: 'forum_1' | 'forum_2' | 'forum_3' | 'keynote'
    | 'conference_1' | 'conference_2' | 'workshop' | 'social' | 'lunch' | 'demos';
}

export const events: ScheduleEvent[] = [
  // 31 de Agosto
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 9, 0),
    end: new Date(2025, 7, 31, 12, 30),
    category: 'workshop'
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
    end: new Date(2025, 7, 31, 17, 30),
    category: 'workshop'
  },

  // 1 de Septiembre
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 12, 30),
    category: 'workshop'
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
    end: new Date(2025, 8, 1, 17, 30),
    category: 'workshop'
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
];

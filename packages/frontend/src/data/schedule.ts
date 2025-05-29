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
    end: new Date(2025, 7, 31, 12, 0),
    location: 'Hall 2',
    category: 'workshop'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 7, 31, 12, 0),
    end: new Date(2025, 7, 31, 13, 30),
    location: 'University Rectorate',
    category: 'lunch'
  },
  {
    title: 'Doctoral Consortium',
    start: new Date(2025, 7, 31, 13, 30),
    end: new Date(2025, 7, 31, 17, 0),
    location: 'Hall 2',
    category: 'workshop'
  },

  // 1 de Septiembre
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 9, 0),
    end: new Date(2025, 8, 1, 12, 30),
    location: 'Hall 4',
    category: 'workshop'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 1, 12, 30),
    end: new Date(2025, 8, 1, 14, 0),
    location: 'Melia\'s Restaurant',
    category: 'lunch'
  },
  {
    title: 'Workshops',
    start: new Date(2025, 8, 1, 14, 0),
    end: new Date(2025, 8, 1, 17, 30),
    location: 'Hall 4',
    category: 'workshop'
  },
  {
    title: 'Reception dinner',
    start: new Date(2025, 8, 1, 19, 0),
    end: new Date(2025, 8, 1, 21, 0),
    location: 'University Rectorate',
    category: 'social'
  },

  // 2 de Septiembre
  {
    title: 'Keynote',
    start: new Date(2025, 8, 2, 9, 0),
    end: new Date(2025, 8, 2, 10, 0),
    location: 'Hall 3',
    category: 'keynote'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 2, 10, 30),
    end: new Date(2025, 8, 2, 12, 0),
    location: 'Hall 3',
    category: 'conference_1'
  },
  {
    title: 'Education Forum',
    start: new Date(2025, 8, 2, 10, 30),
    end: new Date(2025, 8, 2, 12, 0),
    location: 'Hall 4',
    category: 'forum_1'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 2, 12, 0),
    end: new Date(2025, 8, 2, 13, 30),
    location: 'Melia\'s Restaurant',
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 2, 13, 30),
    end: new Date(2025, 8, 2, 17, 0),
    location: 'Hall 3',
    category: 'conference_1'
  },
  {
    title: 'Education Forum',
    start: new Date(2025, 8, 2, 13, 30),
    end: new Date(2025, 8, 2, 17, 0),
    location: 'Hall 4',
    category: 'forum_1'
  },
  {
    title: 'Guided tour',
    start: new Date(2025, 8, 2, 19, 0),
    end: new Date(2025, 8, 2, 21, 30),
    location: 'Cathedral of Seville',
    category: 'social'
  },
  // 3 de Septiembre
  {
    title: 'Keynote',
    start: new Date(2025, 8, 3, 9, 0),
    end: new Date(2025, 8, 3, 10, 0),
    location: 'Main hall',
    category: 'keynote'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 3, 10, 30),
    end: new Date(2025, 8, 3, 12, 0),
    location: 'Hall 4',
    category: 'conference_1'
  },
  {
    title: 'Industry Forum',
    start: new Date(2025, 8, 3, 10, 30),
    end: new Date(2025, 8, 3, 12, 0),
    location: 'Hall 3',
    category: 'forum_2'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 3, 12, 0),
    end: new Date(2025, 8, 3, 13, 30),
    location: 'University Rectorate',
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 3, 13, 30),
    end: new Date(2025, 8, 3, 17, 0),
    location: 'Hall 4',
    category: 'conference_1'
  },
  {
    title: 'Industry Forum',
    start: new Date(2025, 8, 3, 13, 30),
    end: new Date(2025, 8, 3, 17, 0),
    location: 'Hall 3',
    category: 'forum_2'
  },
  {
    title: 'Demos',
    start: new Date(2025, 8, 3, 17, 30),
    end: new Date(2025, 8, 3, 19, 0),
    location: 'Hall 4',
    category: 'demos'
  },
  {
    title: 'Conference dinner',
    start: new Date(2025, 8, 3, 19, 30),
    end: new Date(2025, 8, 3, 21, 0),
    location: 'University Rectorate',
    category: 'social'
  },

  // 4 de Septiembre
  {
    title: 'Keynote',
    start: new Date(2025, 8, 4, 9, 0),
    end: new Date(2025, 8, 4, 10, 0),
    location: 'Hall 1',
    category: 'keynote'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 4, 10, 30),
    end: new Date(2025, 8, 4, 12, 0),
    location: 'Hall 1',
    category: 'conference_1'
  },
  {
    title: 'Responsible BPM Forum',
    start: new Date(2025, 8, 4, 10, 30),
    end: new Date(2025, 8, 4, 12, 0),
    location: 'Hall 2',
    category: 'forum_3'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 4, 12, 0),
    end: new Date(2025, 8, 4, 13, 30),
    location: 'University Rectorate',
    category: 'lunch'
  },
  {
    title: 'Conference',
    start: new Date(2025, 8, 4, 13, 30),
    end: new Date(2025, 8, 4, 17, 0),
    location: 'Hall 1',
    category: 'conference_1'
  },
  {
    title: 'Responsible BPM Forum',
    start: new Date(2025, 8, 4, 13, 30),
    end: new Date(2025, 8, 4, 17, 0),
    location: 'Hall 2',
    category: 'forum_3'
  },
  {
    title: 'Demos',
    start: new Date(2025, 8, 4, 17, 30),
    end: new Date(2025, 8, 4, 19, 0),
    location: 'Hall 1',
    category: 'demos'
  },
  {
    title: 'Farewell',
    start: new Date(2025, 8, 4, 19, 30),
    end: new Date(2025, 8, 4, 21, 0),
    location: 'ETSII',
    category: 'social'
  },

  // 31 de Agosto
  {
    title: 'BPM in Public Administration (Spanish)',
    start: new Date(2025, 8, 5, 9, 0),
    end: new Date(2025, 8, 5, 12, 0),
    location: 'Hall 5',
    category: 'conference_2'
  },
  {
    title: 'Lunch',
    start: new Date(2025, 8, 5, 12, 0),
    end: new Date(2025, 8, 5, 13, 30),
    location: 'University Rectorate',
    category: 'lunch'
  }
];

import type { ScheduleEvent } from "./day";
import { locations } from "./day";

export const tuesdayEvents: ScheduleEvent[] = [
    {
        title: 'Lunch Break',
        start: new Date(2025, 8, 2, 12, 30),
        end: new Date(2025, 8, 2, 14, 0),
        category: 'lunch',
        full: true,
    },
    {
        title: 'Keynote',
        start: new Date(2025, 8, 2, 9, 0),
        end: new Date(2025, 8, 2, 10, 0),
        category: 'keynote',
        location: locations['estepa']
    },
    {
        title: 'Conference',
        start: new Date(2025, 8, 2, 10, 30),
        end: new Date(2025, 8, 2, 12, 30),
        category: 'conference_1',
        location: locations['estepa']
    },
    {
        title: 'Conference',
        start: new Date(2025, 8, 2, 14, 0),
        end: new Date(2025, 8, 2, 15, 30),
        category: 'conference_1',
        location: locations['estepa']
    },
    {
        title: 'Conference',
        start: new Date(2025, 8, 2, 16, 0),
        end: new Date(2025, 8, 2, 17, 30),
        category: 'conference_1',
        location: locations['estepa']
    },
    {
        title: 'Educators Forum',
        start: new Date(2025, 8, 2, 10, 30),
        end: new Date(2025, 8, 2, 12, 30),
        category: 'forum_1',
        location: locations['triana']
    },
    {
        title: 'Educators Forum',
        start: new Date(2025, 8, 2, 14, 0),
        end: new Date(2025, 8, 2, 15, 30),
        category: 'forum_1',
        location: locations['triana']
    },
    {
        title: 'Educators Forum',
        start: new Date(2025, 8, 2, 16, 0),
        end: new Date(2025, 8, 2, 17, 30),
        category: 'forum_1',
        location: locations['triana']
    },
    {
        title: 'Process Technology Forum',
        start: new Date(2025, 8, 2, 10, 30),
        end: new Date(2025, 8, 2, 12, 30),
        category: 'forum_2',
        location: locations['nervion']
    },
    {
        title: 'Process Technology Forum',
        start: new Date(2025, 8, 2, 14, 0),
        end: new Date(2025, 8, 2, 15, 30),
        category: 'forum_2',
        location: locations['nervion']
    },
    {
        title: 'Guided Tour of Reales Alcázares',
        start: new Date(2025, 8, 2, 20, 0),
        end: new Date(2025, 8, 2, 21, 30),
        location: locations['reales-alcazares'],
        href: '/program/social-events/',
        category: 'social',
        full: true,
    }
];
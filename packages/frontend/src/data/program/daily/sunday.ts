import type { ScheduleEvent } from "./day";
import { locations } from "./day";

export const sundayEvents: ScheduleEvent[] = [
    {
        title: 'Doctoral Consortium',
        start: new Date(2025, 7, 31, 9, 0),
        end: new Date(2025, 7, 31, 10, 30),
        category: 'consortium',
        location: locations['triana']
    },
    {
        title: 'Doctoral Consortium',
        start: new Date(2025, 7, 31, 11, 0),
        end: new Date(2025, 7, 31, 12, 30),
        category: 'consortium',
        location: locations['triana']
    },
    {
        title: 'Lunch Break',
        start: new Date(2025, 7, 31, 12, 30),
        end: new Date(2025, 7, 31, 14, 0),
        category: 'lunch',
        full: true,
    },
    {
        title: 'Doctoral Consortium',
        start: new Date(2025, 7, 31, 14, 0),
        end: new Date(2025, 7, 31, 15, 30),
        category: 'consortium',
        location: locations['triana']
    },
    {
        title: 'Doctoral Consortium',
        start: new Date(2025, 7, 31, 16, 0),
        end: new Date(2025, 7, 31, 17, 30),
        category: 'consortium',
        location: locations['triana']
    },
];
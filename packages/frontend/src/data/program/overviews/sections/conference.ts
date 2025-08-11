import type { ScheduleEvent } from '#/types';
import { locations } from '#/data/program/locations';
import { getPermalink } from '#/utils/permalinks';

const mainTrackUrl = getPermalink('/program/main-track');
const bpmForumUrl = getPermalink('/program/bpm-forum');
const processTechUrl = getPermalink('/program/process-technology-forum');
const educatorsUrl = getPermalink('/program/educators-forum');
const industryForumUrl = getPermalink('/program/industry-forum');
const tutorialsUrl = getPermalink('/program/tutorials');
const responsibleUrl = getPermalink('/program/responsible-bpm-forum');

export const conference: ScheduleEvent[] = [
  {
    title: 'Main Track 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    description: 'Predictive Process Monitoring',
    category: 'conference_1',
    location: locations.giralda,
    href: mainTrackUrl
  },
  {
    title: 'BPM Forum 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    description: 'Socio-Technical Perspectives in BPM',
    category: 'bpm_forum',
    location: locations.arenal,
    href: bpmForumUrl
  },
  {
    title: 'Process Technology 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    category: 'objects',
    location: locations.nervion,
    href: processTechUrl
  },
  {
    title: 'Educators Forum 1',
    start: new Date(2025, 8, 2, 11, 0),
    end: new Date(2025, 8, 2, 13, 0),
    description: 'Technology Enhanced Learning',
    category: 'forum_1',
    location: locations.triana,
    href: educatorsUrl
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 2, 13, 0),
    end: new Date(2025, 8, 2, 14, 30),
    category: 'lunch'
  },
  {
    title: 'Main Track 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    description: 'Process Discovery and Analysis',
    category: 'conference_1',
    location: locations.giralda,
    href: mainTrackUrl
  },
  {
    title: 'Educators Forum 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    description: 'Curriculum Innovation',
    category: 'forum_1',
    location: locations.arenal,
    href: educatorsUrl
  },
  {
    title: 'Process Technology 2',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'objects',
    location: locations.nervion,
    href: processTechUrl
  },
  {
    title: 'Journal First 1',
    start: new Date(2025, 8, 2, 14, 30),
    end: new Date(2025, 8, 2, 16, 0),
    category: 'journal_first',
    location: locations.triana
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 2, 16, 0),
    end: new Date(2025, 8, 2, 16, 30),
    category: 'lunch'
  },
  {
    title: 'Main Track 3',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    description: 'Contextual and Secure Methods in Process Intelligence',
    category: 'conference_1',
    location: locations.giralda,
    href: mainTrackUrl
  },
  {
    title: 'Educators Forum 3',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    description: 'Bridging Academia & Industry',
    category: 'forum_1',
    location: locations.arenal,
    href: educatorsUrl
  },
  {
    title: 'Tutorials 1',
    description: 'AI-Assisted Business Process Monitoring',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'workshop',
    location: locations.nervion,
    href: tutorialsUrl
  },
  {
    title: 'Journal First 2',
    start: new Date(2025, 8, 2, 16, 30),
    end: new Date(2025, 8, 2, 18, 0),
    category: 'journal_first',
    location: locations.triana
  },
  {
    title: 'Main Track 4',
    start: new Date(2025, 8, 3, 11, 0),
    end: new Date(2025, 8, 3, 13, 0),
    description: 'Cognitive and Organizational Dimensions',
    category: 'conference_1',
    location: locations.giralda,
    href: mainTrackUrl
  },
  {
    title: 'BPM Forum 2',
    start: new Date(2025, 8, 3, 11, 0),
    end: new Date(2025, 8, 3, 13, 0),
    category: 'bpm_forum',
    description: 'Intelligent Automation and Optimization in BPM',
    location: locations.arenal,
    href: bpmForumUrl
  },
  {
    title: 'Industry Forum 1',
    start: new Date(2025, 8, 3, 11, 0),
    end: new Date(2025, 8, 3, 13, 0),
    category: 'forum_2',
    location: locations.nervion,
    href: industryForumUrl
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 3, 13, 0),
    end: new Date(2025, 8, 3, 14, 30),
    category: 'lunch'
  },
  {
    title: 'Main Track 5',
    start: new Date(2025, 8, 3, 14, 30),
    end: new Date(2025, 8, 3, 16, 0),
    description: 'Simulation, Resource Detection and Optimization',
    category: 'conference_1',
    location: locations.giralda,
    href: mainTrackUrl
  },
  {
    title: 'Tutorials 2',
    start: new Date(2025, 8, 3, 14, 30),
    end: new Date(2025, 8, 3, 16, 0),
    description: 'Constraint-based reasoning and analysis for BPM: CSP to the rescue',
    category: 'workshop',
    location: locations.arenal,
    href: tutorialsUrl
  },
  {
    title: 'Industry Forum 2',
    start: new Date(2025, 8, 3, 14, 30),
    end: new Date(2025, 8, 3, 16, 0),
    description: 'Focus Groups: Grand Challenges and Opportunities in the adoption of BPM in industry and the public sector',
    category: 'forum_2',
    location: locations.nervion,
    href: industryForumUrl
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 3, 16, 0),
    end: new Date(2025, 8, 3, 16, 30),
    category: 'lunch'
  },
  {
    title: 'Demos',
    start: new Date(2025, 8, 3, 16, 30),
    end: new Date(2025, 8, 3, 18, 0),
    category: 'demos',
    location: locations.sta_cruz
  },
  {
    title: 'Celonis Tutorial',
    start: new Date(2025, 8, 3, 16, 30),
    end: new Date(2025, 8, 3, 18, 0),
    category: 'workshop',
    location: locations.nervion,
    href: tutorialsUrl
  },
  {
    title: 'Journal First 3',
    start: new Date(2025, 8, 3, 16, 30),
    end: new Date(2025, 8, 3, 18, 0),
    category: 'journal_first',
    location: locations.arenal
  },
  {
    title: 'Main Track 6',
    start: new Date(2025, 8, 4, 11, 0),
    end: new Date(2025, 8, 4, 13, 0),
    description: 'Conformance Checking and Temporal Constraints',
    category: 'conference_1',
    location: locations.giralda,
    href: mainTrackUrl
  },
  {
    title: 'BPM Forum 3',
    start: new Date(2025, 8, 4, 11, 0),
    end: new Date(2025, 8, 4, 13, 0),
    description: 'Process Modeling, Simulation, and Verification',
    category: 'bpm_forum',
    location: locations.arenal,
    href: bpmForumUrl
  },
  {
    title: 'Responsible BPM 1',
    start: new Date(2025, 8, 4, 11, 0),
    end: new Date(2025, 8, 4, 13, 0),
    category: 'forum_3',
    location: locations.nervion,
    href: responsibleUrl
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 8, 4, 13, 0),
    end: new Date(2025, 8, 4, 14, 30),
    category: 'lunch'
  },
  {
    title: 'Main Track 7',
    start: new Date(2025, 8, 4, 14, 30),
    end: new Date(2025, 8, 4, 16, 0),
    description: 'Detecting Rules and Descriptions',
    category: 'conference_1',
    location: locations.giralda,
    href: mainTrackUrl
  },
  {
    title: 'Tutorials 3',
    start: new Date(2025, 8, 4, 14, 30),
    end: new Date(2025, 8, 4, 16, 0),
    description: 'Business Process Optimization',
    category: 'workshop',
    location: locations.arenal,
    href: tutorialsUrl
  },
  {
    title: 'Responsible BPM 2',
    start: new Date(2025, 8, 4, 14, 30),
    end: new Date(2025, 8, 4, 16, 0),
    category: 'forum_3',
    location: locations.nervion,
    href: responsibleUrl
  },
  {
    title: 'Coffee Break',
    start: new Date(2025, 8, 4, 16, 0),
    end: new Date(2025, 8, 4, 16, 30),
    category: 'lunch'
  },
  {
    title: 'Panel',
    start: new Date(2025, 8, 4, 16, 30),
    end: new Date(2025, 8, 4, 17, 30),
    category: 'demos',
    location: locations.giralda,
    href: getPermalink('/program/panel')
  }
];

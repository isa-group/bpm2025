import type { ComponentProps } from 'astro/types';
import type { Item } from '#/types';
import type Table from '#/components/ui/Table.astro';

export interface ProgramOverview {
  name: string;
  date?: string;
  location?: string;
  tables?: ComponentProps<typeof Table>[];
  items?: Item[];
}

/**
 * Converts the program name to the URI portrayed in the URL
 */
export function program_name_to_uri(n: string) {
  return n.replaceAll(' ', '-').toLowerCase();
}

export const program_overviews: ProgramOverview[] = [
  {
    name: 'Process Technology Forum',
    location: '"Nervión" Hall',
    date: 'Tuesday, Sept 2nd, 2025',
    tables: [
      {
        title: 'Session 1: Mathias Weske, Remco Dijkman',
        rows: [
          {
            Hour: '11:00',
            Title: '<i>Opening</i>',
            Authors: 'PC Chairs'
          },
          {
            Hour: '11:10',
            Title: 'Keynote',
            Authors: 'Stefanie Rinderle-Ma'
          },
          {
            Hour: '12:00',
            Title: 'KRAFT – A Knowledge-Graph-Based Resource Allocation Framework',
            Authors: 'Leon Bein, Niels Martin and Luise Pufahl'
          },
          {
            Hour: '12:15',
            Title: 'An RPA-BPMS Integration Framework Leveraging RPA as a Resource',
            Authors: 'Lingtong Zhang, Jing Yang, Chun Ouyang and Yang Yu'
          },
          {
            Hour: '12:30',
            Title: 'Towards Automated Handling of Object State Exceptions in Smart Contracts',
            Authors: 'Julius Köpke, Giovanni Meroni and Mattia Salnitri'
          },
          {
            Hour: '12:45',
            Title: 'HiProX: Highly Efficient Process Execution on IoT and Edge Devices',
            Authors: 'Dominik Voigt, Lisa Podszun, Juergen Mangler and Stefanie Rinderle-Ma'
          },
          {
            Hour: '13:00',
            Title: '<i>Lunch Break</i>'
          }
        ]
      },
      {
        title: 'Session 2: Dimka Karastoyanova',
        rows: [
          {
            Hour: '14:30',
            Title: 'Leveraging Counterfactuals for Prescriptive Process Analytics',
            Authors: 'Ngoc-Diem Le, Alessandro Padella, Francesco Vinci and Massimiliano de Leoni'
          },
          {
            Hour: '14:45',
            Title: 'Privacy and Confidentiality Requirements Engineering for Process Data',
            Authors: 'Fabian Haertel, Juergen Mangler, Nataliia Klievtsova, Eugen Rigger, Celine Mader and Stefanie Rinderle-Ma'
          },
          {
            Hour: '15:00',
            Title: 'Beyond Logs: AI’s Embeddings as the New Process Evidence',
            Authors: 'Aleksandar Gavric, Dominik Bork and Henderik A. Proper'
          },
          {
            Hour: '15:15',
            Title: 'The future of RPA in the context Automation Plattforms',
            Authors: 'Tom Hohenadl and Bernhard Axmann'
          },
          {
            Hour: '15:30',
            Title: 'Multimodal Zero-Shot Activity Recognition for Process Mining of Robotic Systems',
            Authors: 'Flavio Corradini, Sara Pettinari, Barbara Re, Lorenzo Rossi and Massimiliano Sampaolo'
          },
          {
            Hour: '15:45',
            Title: 'Time Series-based Segmentation of Noisy User Interaction Logs for Robotic Process Automation',
            Authors: 'Tom Hohenadl'
          },
          {
            Hour: '16:00',
            Title: '<i>Closing</i>'
          }
        ]
      }
    ]
  },
  {
    name: 'Industry Forum',
    location: '"Nervión" Hall',
    date: 'Wednesday, Sept 3rd, 2025',
    tables: [
      {
        title: 'First session (10:30 - 12:30)',
        rows: [
          {
            Hour: '10:00',
            Title: '<i>Opening</i>',
            Authors: 'Chairs'
          },
          {
            Hour: '10:05',
            Title: 'Impact of Process Redesign: A Case Study from Indonesian Higher Education Data Reporting',
            Authors: 'Indri Sudanawati Rozas, Sugianto Halim, Mahendrawathi Er and Arif Wibisono'
          },
          {
            Hour: '10:20',
            Title: 'Compliance Checking in Action for INGKA Group Inventory Management',
            Authors: 'Alessio Galassi, Barbara Re, Stefan Reimann and Lorenzo Rossi'
          },
          {
            Hour: '10:35',
            Title: 'CreaDev - A Structured Framework for Embedding Creativity in Business Process Management',
            Authors: 'Jasmin Fattah-Weil, Jako Roder, Lydia Schäfer, Doris Fay and Norbert Gronau'
          },
          {
            Hour: '10:50',
            Title: 'The process orientation in the Agencia Digital de Andalucia',
            Authors: 'Juan Sebastián Ojeda Pérez, Elena Sauci Sánchez and Juan Francisco Fernández Ramos'
          },
          {
            Hour: '11:05',
            Title: 'Automating Financial Reconciliation: Leveraging RPA for Efficiency and Accuracy in Banking Operations',
            Authors: 'Elheme Azemi and Saimir Bala'
          },
          {
            Hour: '11:20',
            Title: 'From Silos to Synergy: Embedding BPM at Sri Lanka Telecom to Drive Strategic Alignment',
            Authors: 'Dinusha Rajapaksha, Wasana Bandara, Naleen Jayasuriya, Bandula Wimalasuriya, Rehan Syed and Ishadi Mirispelakotuwa'
          },
          {
            Hour: '11:35',
            Title: 'Round table: retrospectives and common trends on how BPM is changing the industry',
            Authors: 'All authors + audience'
          }
        ]
      },
      {
        title: 'Second session (14:00 - 15:30)',
        rows: [
          {
            Hour: '-',
            Topic: 'Focus Groups: Grand Challenges and Opportunities in the adoption of BPM in industry and the public sector'
          },
          {
            Hour: '14:00',
            Topic: 'Introduction of the dynamics by the chairs'
          },
          {
            Hour: '14:05',
            Topic: 'Focused Discussion and appointment of speaker'
          },
          {
            Hour: '15:10',
            Topic: 'Selected speakers gives a retrospective of the discussion'
          }
        ]
      }
    ]
  },
  {
    name: 'Responsible BPM Forum',
    location: '"Nervión" Hall',
    date: 'Thursday, Sept 4th, 2025',
    tables: [
      {
        title: 'First session (11:00 - 13:00)',
        showRowIndex: true,
        rows: [
          {
            Hour: '11:00',
            Title: '<b>INVITED SPEAKERS (To Be Confirmed)</b>'
          },
          {
            Hour: '11:40',
            Title: 'The Impact of Event Data Partitioning on Privacy-aware Process Discovery',
            Authors: 'Jungeun Lim, Stephan Fahrenkrog-Petersen, Xixi Lu, Jan Mendling and Minseok Song'
          },
          {
            Hour: '11:55',
            Title: 'AI-driven BPM: Dehumanization of the Firm?',
            Authors: 'Paul Simonis and Ed Overes'
          },
          {
            Hour: '12:10',
            Title: "Agentic Business Process Management: Practitioner's Perspectives on Agent Governance in Business Processes",
            Authors: 'Hoang Vu, Nataliia Klievtsova, Henrik Leopold, Stefanie Rinderle-Ma and Timotheus Kampik'
          },
          {
            Hour: '12:25',
            Title: 'Motivational Process Mining: A Conceptualization By Adding Self-Determination Theory',
            Authors: 'Amy Van Looy and Peter Vlerick'
          },
          {
            Hour: '12:40',
            Title: 'Anchoring ESG Goals in Business Processes: Engagement Patterns in Polish Organizations',
            Authors: 'Natalia R Potoczek, Adriana Paliwoda-Matiolańska, Katarzyna B Homoncik and Mariusz Łapczyński'
          },
          {
            Hour: '12:55',
            Title: '<i>Session Wrap Up</i>'
          }
        ]
      },
      {
        title: 'Second session (14:30 - 16:00)',
        showRowIndex: true,
        rows: [
          {
            Hour: '14:30',
            Title: 'Bridging BPM and Sustainability Journeys in Navigating Sustainability Paradoxical Tensions',
            Authors: 'Ika Nurkasanah and Amy Van Looy'
          },
          {
            Hour: '14:45',
            Title: 'Operationalizing Responsible BPM: A Method for Value-based Process Redesign',
            Authors: 'Djordje Djurica, Sandro Franzoi and Sarah Spiekermann'
          },
          {
            Hour: '15:00',
            Title: 'Designing Business Processes for Good: A Canvas-Based Framework for Routinized Benevolence',
            Authors: 'Thamali Chandrasiri, Wasana Bandara, Michael Rosemann, Nadine Ostern and Marleen Voss'
          },
          {
            Hour: '15:15',
            Title: 'ReDPT-CT: Designing Responsible Digital Process Twins for Clinical Trials',
            Authors: 'Luiz Ricardo Brito Ribeiro, Silvia Inês Dallavalle de Pádua, Gerald Kremer and Rainer Stark'
          },
          {
            Hour: '15:30',
            Title: 'Measuring Moral Performance: A Framework for Ethical Business Process Management',
            Authors: 'Leo Poss, Christopher Julian Kern, Christoph Stoiber, Julia Kroenung and Stefan Schönig'
          },
          {
            Hour: '12:45',
            Title: '<i>Forum Wrap Up</i>'
          }
        ]
      }
    ]
  },
  {
    name: 'Tutorials',
    items: [
      {
        title: 'Tutorial 1: <u>AI-Assisted Business Process Monitoring</u>',
        description: `
          <i>Andreas Metzger</i>
          <br /><br />
          Business process monitoring involves tracking and analyzing operational business processes to
          gain insights into their performance, identify bottlenecks, and facilitate that they are running efficiently.
          This tutorial introduces the participants into how modern AI methods can be employed to realize
          predictive as well as prescriptive business processes monitoring.
          Where predictive monitoring helps to answer “what will happen and when?”,
          prescriptive monitoring allows answering “when to intervene and how?” Together, these monitoring
          approaches assist process managers and operators in deciding on when and how to intervene during an ongoing
          business process in order to prevent or mitigate the occurrence of an undesired process outcome.
          The tutorial introduces the participants to advanced deep learning methods for business process
          monitoring: deep supervised learning for predictive monitoring, and deep reinforcement learning for
          prescriptive monitoring. The tutorial positions these deep learning methods within the overall
          framework of business process monitoring systems and explains how deep learning helps to address key
          challenges. It presents empirical results on the effectiveness and cost savings of these
          deep learning methods, which are distilled into a set of recommendations for selecting
          appropriate deep learning methods in practice. Finally, the tutorial provides an outlook on future
          directions in AI-assisted business process monitoring, particularly elaborating the opportunities
          introduced by large language models (LLMs) and the need for explainable AI (XAI).
        `
      },
      {
        title: 'Tutorial 2: <u>Constraint-based reasoning and analysis for BPM: CSP to the rescue</u>',
        description: `
          <i>Alessandro Gianola, Andrey Rivkin and Mateusz Slazynski</i>
          <br /><br />
          Formal methods have always been an integral part of the BPM lifecycle. They are mathematically
          grounded techniques used to specify and analyze complex systems with a high degree of precision.
          In BPM, they help ensure that processes are correctly specified and capable of achieving the intended
          outcomes, by detecting design flaws and verifying compliance with defined goals.
          Among these techniques, the Constraint Satisfaction Problem (CSP) stands out as a powerful
          approach to specifying and solving problems with clearly defined constraints. CSP techniques are known
          for their high performance, yet a major barrier to broader use lies in the difficulty of defining
          suitable encodings, which require expert knowledge. Nevertheless, modern tools have made substantial
          progress in improving CSP accessibility for non-experts. In this tutorial, we define CSP, motivate its use
          in BPM, and showcase how two CSP instances, one over Boolean and the other over structured domains,
          can be used to solve BPM analysis problems via suitable encodings. Such encodings will be demonstrated
          during hands-on sessions with the help of state-of-the-art CSP tools. As a key learning outcome,
          participants will gain a deeper understanding of CSP-based formal methods and their integration into
          process analysis. 
        `
      },
      {
        title: 'Tutorial 3: <u>Business Process Optimization</u>',
        description: `
          <i>Remco Dijkman and Arik Senderovich</i>
          <br /><br />
          Business Process Optimization (BPO) concerns making optimal operational decisions
          during process redesign or process execution—such as task assignment, resource allocation,
          resource staffing, and case advancement (e.g., admitting a patient). These decisions must balance
          objectives like cost, time, and satisfaction while respecting constraints like availability,
          deadlines, and budgets often under uncertaitny. Though related to Prescriptive Process Monitoring (PrPM),
          BPO addresses constrained combinatorial problems that often exceed real-time capabilities.
          This tutorial introduces key BPO problem types and solution approaches,
          illustrating specific problem-solution pairs that were already explored.
          While not exhaustive, the classification aims to provide a structured overview and spark future
          research in this emerging area. 
        `
      }
    ]
  }
];

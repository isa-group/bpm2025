export interface ProgramOverview {
  name: string;
  date: string;
  location: string;
  tables: {
    title?: string;
    showRowIndex?: boolean;
    rows: {
      [key: string]: string;
    }[];
  }[];
}

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
            Start: '11:00',
            Duration: '10 minutes',
            Speakers: 'PC Chairs',
            Topic: '<i>Opening</i>'
          },
          {
            Start: '11:10',
            Duration: '50 minutes',
            Speakers: 'Stefanie Rinderle-Ma',
            Topic: 'Keynote'
          },
          {
            Start: '12:00',
            Duration: '15 minutes',
            Speakers: 'Leon Bein, Niels Martin and Luise Pufahl',
            Topic: 'KRAFT – A Knowledge-Graph-Based Resource Allocation Framework'
          },
          {
            Start: '12:15',
            Duration: '15 minutes',
            Speakers: 'Lingtong Zhang, Jing Yang, Chun Ouyang and Yang Yu',
            Topic: 'An RPA-BPMS Integration Framework Leveraging RPA as a Resource'
          },
          {
            Start: '12:30',
            Duration: '15 minutes',
            Speakers: 'Julius Köpke, Giovanni Meroni and Mattia Salnitri',
            Topic: 'Towards Automated Handling of Object State Exceptions in Smart Contracts'
          },
          {
            Start: '12:45',
            Duration: '15 minutes',
            Speakers: 'Dominik Voigt, Lisa Podszun, Juergen Mangler and Stefanie Rinderle-Ma',
            Topic: 'HiProX: Highly Efficient Process Execution on IoT and Edge Devices'
          },
          {
            Start: '13:00',
            Duration: '1 hour and 30 minutes',
            Topic: '<i>Lunch Break</i>'
          }
        ]
      },
      {
        title: 'Session 2: Dimka Karastoyanova',
        rows: [
          {
            'Start': '14:30',
            'Duration (minutes)': '15',
            'Speakers': 'Ngoc-Diem Le, Alessandro Padella, Francesco Vinci and Massimiliano de Leoni',
            'Topic': 'Leveraging Counterfactuals for Prescriptive Process Analytics'
          },
          {
            'Start': '14:45',
            'Duration (minutes)': '15',
            'Speakers': 'Fabian Haertel, Juergen Mangler, Nataliia Klievtsova, Eugen Rigger, Celine Mader and Stefanie Rinderle-Ma',
            'Topic': 'Privacy and Confidentiality Requirements Engineering for Process Data'
          },
          {
            'Start': '15:00',
            'Duration (minutes)': '15',
            'Speakers': 'Aleksandar Gavric, Dominik Bork and Henderik A. Proper',
            'Topic': 'Beyond Logs: AI’s Embeddings as the New Process Evidence'
          },
          {
            'Start': '15:15',
            'Duration (minutes)': '15',
            'Speakers': 'Tom Hohenadl and Bernhard Axmann',
            'Topic': 'The future of RPA in the context Automation Plattforms'
          },
          {
            'Start': '15:30',
            'Duration (minutes)': '15',
            'Speakers': 'Flavio Corradini, Sara Pettinari, Barbara Re, Lorenzo Rossi and Massimiliano Sampaolo',
            'Topic': 'Multimodal Zero-Shot Activity Recognition for Process Mining of Robotic Systems'
          },
          {
            'Start': '15:45',
            'Duration (minutes)': '15',
            'Speakers': 'Tom Hohenadl',
            'Topic': 'Time Series-based Segmentation of Noisy User Interaction Logs for Robotic Process Automation'
          },
          {
            Start: '16:00',
            Topic: '<i>Closing</i>'
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
            Start: '10:00',
            End: '10:05',
            Paper: '<i>Opening</i>',
            Authors: 'Chairs'
          },
          {
            Start: '10:05',
            End: '10:20',
            Paper: 'Impact of Process Redesign: A Case Study from Indonesian Higher Education Data Reporting',
            Authors: 'Indri Sudanawati Rozas, Sugianto Halim, Mahendrawathi Er and Arif Wibisono'
          },
          {
            Start: '10:20',
            End: '10:35',
            Paper: 'Compliance Checking in Action for INGKA Group Inventory Management',
            Authors: 'Alessio Galassi, Barbara Re, Stefan Reimann and Lorenzo Rossi'
          },
          {
            Start: '10:35',
            End: '10:50',
            Paper: 'CreaDev - A Structured Framework for Embedding Creativity in Business Process Management',
            Authors: 'Jasmin Fattah-Weil, Jako Roder, Lydia Schäfer, Doris Fay and Norbert Gronau'
          },
          {
            Start: '10:50',
            End: '11:05',
            Paper: 'The process orientation in the Agencia Digital de Andalucia',
            Authors: 'Juan Sebastián Ojeda Pérez, Elena Sauci Sánchez and Juan Francisco Fernández Ramos'
          },
          {
            Start: '11:05',
            End: '11:20',
            Paper: 'Automating Financial Reconciliation: Leveraging RPA for Efficiency and Accuracy in Banking Operations',
            Authors: 'Elheme Azemi and Saimir Bala'
          },
          {
            Start: '11:20',
            End: '11:35',
            Paper: 'From Silos to Synergy: Embedding BPM at Sri Lanka Telecom to Drive Strategic Alignment',
            Authors: 'Dinusha Rajapaksha, Wasana Bandara, Naleen Jayasuriya, Bandula Wimalasuriya, Rehan Syed and Ishadi Mirispelakotuwa'
          },
          {
            Start: '11:35',
            End: '12:30',
            Paper: 'Round table: retrospectives and common trends on how BPM is changing the industry',
            Authors: 'All authors + audience'
          }
        ]
      },
      {
        title: 'Second session (14:00 - 15:30)',
        rows: [
          {
            Topic: 'Focus Groups: Grand Challenges and Opportunities in the adoption of BPM in industry and the public sector'
          },
          {
            Start: '14:00',
            End: '14:05',
            Topic: 'Introduction of the dynamics by the chairs'
          },
          {
            Start: '14:05',
            End: '15:05',
            Topic: 'Focused Discussion and appointment of speaker'
          },
          {
            Start: '15:10',
            End: '15:30',
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
        rows: [
          {
            'Paper ID': '-',
            'Agenda': '<b>INVITED SPEAKERS (To Be Confirmed)</b>',
            'Title': '-',
            'Keywords': '-',
            'Duration (minutes)': '40'
          }
        ]
      },
      {
        title: 'First session (11:00 - 13:00)',
        showRowIndex: true,
        rows: [
          {
            'Paper ID': '198',
            'Author': 'Jungeun Lim, Stephan Fahrenkrog-Petersen, Xixi Lu, Jan Mendling and Minseok Song',
            'Title': 'The Impact of Event Data Partitioning on Privacy-aware Process Discovery',
            'Keywords': 'Privacy-preserving Process Mining | Event Log Anonymization | Event Log Pre-processing',
            'PIC': 'Avi',
            'Duration (minutes)': '15'
          },
          {
            'Paper ID': '239',
            'Author': 'Paul Simonis and Ed Overes',
            'Title': 'AI-driven BPM: Dehumanization of the Firm?',
            'Keywords': 'Responsible Business Process Management | Process Autonomization | Artificial Intelligence | Stakeholder Theory',
            'PIC': 'Avi',
            'Duration (minutes)': '15'
          },
          {
            'Paper ID': '246',
            'Author': 'Hoang Vu, Nataliia Klievtsova, Henrik Leopold, Stefanie Rinderle-Ma and Timotheus Kampik',
            'Title': "Agentic Business Process Management: Practitioner's Perspectives on Agent Governance in Business Processes",
            'Keywords': 'Autonomous Agents | Generative AI | Business Process Management',
            'PIC': 'Avi',
            'Duration (minutes)': '15'
          },
          {
            'Paper ID': '234',
            'Author': 'Amy Van Looy and Peter Vlerick',
            'Title': 'Motivational Process Mining: A Conceptualization By Adding Self-Determination Theory',
            'Keywords': 'Process Mining | Motivation | Well-being | Self-determination',
            'PIC': 'Thomas',
            'Duration (minutes)': '15'
          },
          {
            'Paper ID': '243',
            'Author': 'Natalia R Potoczek, Adriana Paliwoda-Matiolańska, Katarzyna B Homoncik and Mariusz Łapczyński',
            'Title': 'Anchoring ESG Goals in Business Processes: Engagement Patterns in Polish Organizations',
            'Keywords': 'Responsible BPM | ESG goals | ESG strategy | Institutional Pressure | Business environment',
            'PIC': 'Thomas',
            'Duration (minutes)': '15'
          },
          {
            'Keywords': '<i>Session Wrap Up</i>',
            'Duration (minutes)': '5'
          },
          {
            'PIC': '<b>TOTAL</b>',
            'Duration (minutes)': '120'
          }
        ]
      },
      {
        title: 'Second session (14:30 - 16:00)',
        showRowIndex: true,
        rows: [
          {
            'Paper ID': '244',
            'Author': 'Ika Nurkasanah and Amy Van Looy',
            'Title': 'Bridging BPM and Sustainability Journeys in Navigating Sustainability Paradoxical Tensions',
            'Keywords': 'Business Process Management | Sustainability | Paradox | Sustainable BPM | Paradoxical Tension',
            'PIC': 'Thomas',
            'Duration (minutes)': '15'
          },
          {
            'Paper ID': '260',
            'Author': 'Djordje Djurica, Sandro Franzoi and Sarah Spiekermann',
            'Title': 'Operationalizing Responsible BPM: A Method for Value-based Process Redesign',
            'Keywords': 'Responsible BPM | Business Process Redesign | Value-Based Engineering | Ethical Design | Stakeholder Values',
            'PIC': 'Thomas',
            'Duration (minutes)': '15'
          },
          {
            'Paper ID': '281',
            'Author': 'Thamali Chandrasiri, Wasana Bandara, Michael Rosemann, Nadine Ostern and Marleen Voss',
            'Title': 'Designing Business Processes for Good: A Canvas-Based Framework for Routinized Benevolence',
            'Keywords': 'Canvas | Routinized Benevolence | Responsible Process Design | Mutualistic Value Creation',
            'PIC': 'Flavia',
            'Duration (minutes)': '15'
          },
          {
            'Paper ID': '278',
            'Author': 'Luiz Ricardo Brito Ribeiro, Silvia Inês Dallavalle de Pádua, Gerald Kremer and Rainer Stark',
            'Title': 'ReDPT-CT: Designing Responsible Digital Process Twins for Clinical Trials',
            'Keywords': 'Clinical Research Center | Digital Twin | BPM Ethics',
            'PIC': 'Flavia',
            'Duration (minutes)': '15'
          },
          {
            'Paper ID': '321',
            'Author': 'Leo Poss, Christopher Julian Kern, Christoph Stoiber, Julia Kroenung and Stefan Schönig',
            'Title': 'Measuring Moral Performance: A Framework for Ethical Business Process Management',
            'Keywords': 'BPM | Ethical Values | Sociotechnical System | Benevolent BPM | Ethics-aware BPM',
            'PIC': 'Flavia',
            'Duration (minutes)': '15'
          },
          {
            'Keywords': '<i>Forum Wrap Up</i>',
            'Duration (minutes)': '5'
          },
          {
            'PIC': '<b>TOTAL</b>',
            'Duration (minutes)': '90'
          }
        ]
      }
    ]
  }
];

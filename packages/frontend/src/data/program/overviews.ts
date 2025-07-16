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
    location: 'Sala Nervión',
    date: 'Tuesday, Sept 2nd, 2025',
    tables: [
      {
        title: 'Session 1: Mathias Weske, Remco Dijkman',
        rows: [
          { Start: '11:00', Duration: '10 minutes', Speakers: 'PC Chairs', Topic: 'Opening' },
          { Start: '11:10', Duration: '50 minutes', Speakers: 'Stefanie Rinderle-Ma', Topic: 'Keynote' },
          { Start: '12:00', Duration: '15 minutes', Speakers: 'Leon Bein, Niels Martin and Luise Pufahl', Topic: 'KRAFT – A Knowledge-Graph-Based Resource Allocation Framework' },
          { Start: '12:15', Duration: '15 minutes', Speakers: 'Lingtong Zhang, Jing Yang, Chun Ouyang and Yang Yu', Topic: 'An RPA-BPMS Integration Framework Leveraging RPA as a Resource' },
          { Start: '12:30', Duration: '15 minutes', Speakers: 'Julius Köpke, Giovanni Meroni and Mattia Salnitri', Topic: 'Towards Automated Handling of Object State Exceptions in Smart Contracts' },
          { Start: '12:45', Duration: '15 minutes', Speakers: 'Dominik Voigt, Lisa Podszun, Juergen Mangler and Stefanie Rinderle-Ma', Topic: 'HiProX: Highly Efficient Process Execution on IoT and Edge Devices' },
          { Start: '13:00', Duration: '1 hour and 30 minutes', Topic: 'Lunch Break' }
        ]
      },
      {
        title: 'Session 2: Dimka Karastoyanova',
        rows: [
          { Start: '14:30', Duration: '15 minutes', Speakers: 'Ngoc-Diem Le, Alessandro Padella, Francesco Vinci and Massimiliano de Leoni', Topic: 'Leveraging Counterfactuals for Prescriptive Process Analytics' },
          { Start: '14:45', Duration: '15 minutes', Speakers: 'Fabian Haertel, Juergen Mangler, Nataliia Klievtsova, Eugen Rigger, Celine Mader and Stefanie Rinderle-Ma', Topic: 'Privacy and Confidentiality Requirements Engineering for Process Data' },
          { Start: '15:00', Duration: '15 minutes', Speakers: 'Aleksandar Gavric, Dominik Bork and Henderik A. Proper', Topic: 'Beyond Logs: AI’s Embeddings as the New Process Evidence' },
          { Start: '15:15', Duration: '15 minutes', Speakers: 'Tom Hohenadl and Bernhard Axmann', Topic: 'The future of RPA in the context Automation Plattforms' },
          { Start: '15:30', Duration: '15 minutes', Speakers: 'Flavio Corradini, Sara Pettinari, Barbara Re, Lorenzo Rossi and Massimiliano Sampaolo', Topic: 'Multimodal Zero-Shot Activity Recognition for Process Mining of Robotic Systems' },
          { Start: '15:45', Duration: '15 minutes', Speakers: 'Tom Hohenadl', Topic: 'Time Series-based Segmentation of Noisy User Interaction Logs for Robotic Process Automation' },
          { Start: '16:00', Topic: 'Closing' }
        ]
      }
    ]
  },
  {
    name: 'Responsible BPM Forum'
  },
  {
    name: 'Tutorials'
  },
  {
    name: 'Industry Forum'
  }
];

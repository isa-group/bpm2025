// awards.ts
// BPM 2025 Awards Data

export interface AwardEntry {
  title: string;
  winners: string[];
  paper?: string;
  placement?: string; // for cases like Runner-Up, 2nd Place, etc.
}

export interface AwardCategory {
  category: string;
  entries: AwardEntry[];
}

export const awards: AwardCategory[] = [
  {
    category: 'BPM Test-of-Time Award 2025',
    entries: [
      {
        title: 'Winner',
        winners: ['Ingo Weber', 'Xiwei Xu', 'Régis Riveret', 'Guido Governatori', 'Alexander Ponomarev', 'Jan Mendling'],
        paper: 'Untrusted Business Process Monitoring and Execution Using Blockchain (BPM 2016, Rio de Janeiro)'
      },
      {
        title: 'Runner-Up',
        winners: ['Anna Leontjeva', 'Raffaele Conforti', 'Chiara Di Francescomarino', 'Marlon Dumas', 'Fabrizio Maria Maggi'],
        paper: 'Complex Symbolic Sequence Encodings for Predictive Monitoring of Business Processes (BPM 2015, Innsbruck)',
        placement: 'Runner-Up'
      }
    ]
  },
  {
    category: 'Best Paper Award 2025',
    entries: [
      {
        title: 'Winner',
        winners: ['Orlenys López-Pintado', 'Jannis Rosenbaum', 'Marlon Dumas'],
        paper: 'Optimization of Activity Batching Policies in Business Processes'
      }
    ]
  },
  {
    category: 'Best Student Paper Award 2025',
    entries: [
      {
        title: 'Winner',
        winners: ['Maike Basmer', 'Hannes Ueck', 'Dirk Fahland', 'Matthias Weidlich'],
        paper: 'MANTA: Materializing Views on Event Data for Context Exploration in Process Analysis'
      },
      {
        title: 'Runner-Up',
        winners: ['Marie-Christin Häge', 'Jana-Rebecca Rehse'],
        paper: 'Mental Maps in Process Mining: Does Stabilizing DFGs Improve Process Analysis Performance?',
        placement: 'Runner-Up'
      },
      {
        title: 'Runner-Up',
        winners: ['Simon Rauch', 'Christian Frey', 'Andrea Maldonado', 'Thomas Seidl'],
        paper: 'BEST: Bilaterally Expanding Subtrace Tree for Event Sequence Prediction',
        placement: 'Runner-Up'
      }
    ]
  },
  {
    category: 'Best Reviewer Award 2025',
    entries: [
      {
        title: 'Winner',
        winners: ['Orlenys López-Pintado']
      },
      {
        title: 'Honorable Mentions',
        winners: ['Lars Ackermann', 'Iris Beerepoot', 'Edyta Brzychczy', 'Rik Eshuis', 'Renata Gabryelczyk', 'Natalia Sidorova', 'Roy Yang'],
        placement: 'Honorable Mentions'
      }
    ]
  },
  {
    category: 'Best BPM Dissertation Award 2025',
    entries: [
      {
        title: 'Winner',
        winners: ['Antonio Martínez-Rojas'],
        paper: 'Automate It All! Revamping the Outsourcing Industry'
      },
      {
        title: 'Runner-Up',
        winners: ['Gyunam Park'],
        paper: 'Action-Oriented Process Mining: From Insights to Actions',
        placement: 'Runner-Up'
      },
      {
        title: 'Runner-Up',
        winners: ['Alessandro Padella'],
        paper: 'Process and Resource-Aware Responsible Recommender Systems',
        placement: 'Runner-Up'
      }
    ]
  },
  {
    category: 'Best Process Technology Forum Paper Award 2025',
    entries: [
      {
        title: 'Winner',
        winners: ['Leon Bein', 'Niels Martin', 'Luise Pufahl'],
        paper: 'KRAFT – A Knowledge-Graph-Based Resource Allocation Framework'
      },
      {
        title: 'Runner-Up',
        winners: ['Dominik Voigt', 'Lisa Podszun', 'Juergen Mangler', 'Stefanie Rinderle-Ma'],
        paper: 'HiProX: Highly Efficient Process Execution on IoT and Edge Devices',
        placement: 'Runner-Up'
      }
    ]
  },
  {
    category: 'Best Responsible BPM Forum Paper Award 2025',
    entries: [
      {
        title: 'Winner',
        winners: ['Jungeun Lim', 'Stephan Fahrenkrog-Petersen', 'Xixi Lu', 'Jan Mendling', 'Minseok Song'],
        paper: 'The Impact of Event Data Partitioning on Privacy-aware Process Discovery'
      },
      {
        title: '2nd Place',
        winners: ['Hoang Vu', 'Nataliia Klievtsova', 'Henrik Leopold', 'Stefanie Rinderle-Ma', 'Timotheus Kampik'],
        paper: "Agentic Business Process Management: Practitioner's Perspectives on Agent Governance in Business Processes",
        placement: '2nd Place'
      },
      {
        title: '3rd Place',
        winners: ['Ika Nurkasanah', 'Amy Van Looy'],
        paper: 'Bridging BPM and Sustainability Journeys in Navigating Sustainability Paradoxical Tensions',
        placement: '3rd Place'
      }
    ]
  },
  {
    category: 'Best Industry Forum Paper Award 2025',
    entries: [
      {
        title: 'Winner',
        winners: ['Indri Sudanawati Rozas', 'Sugianto Halim', 'Mahendrawathi Er', 'Arif Wibisono'],
        paper: 'Impact of Process Redesign: A Case Study from Indonesian Higher Education Data Reporting'
      }
    ]
  },
  {
    category: 'Best Educators Forum Paper Award 2025',
    entries: [
      {
        title: 'Winner',
        winners: [
          'Krzysztof Kluza', 'Marzena Grzesiak', 'Piotr Sliż',
          'Leszek Szała', 'Anna Suchenia', 'Karol Suchenia', 'Marek Moszynski'
        ],
        paper: 'Revisiting BPMN Assignments with AI in Mind: Insights from Experiments with Large Language Models in Process Modeling Education'
      }
    ]
  },
  {
    category: 'Best Demos & Resources',
    entries: [
      {
        title: 'Winner',
        winners: ['Aaron Küsters', 'Wil van der Aalst'],
        paper: 'Easy and Efficient Object-Centric Process Querying with the OCPQ Tool'
      },
      {
        title: 'Wow factor',
        winners: [
          'Flavio Corradini', 'Luca Mozzoni', 'Jessica Piccioni',
          'Barbara Re', 'Lorenzo Rossi', 'Francesco Tiezzi'
        ],
        paper: 'BEAR 2.0: Enhancing the Environment Model for Animating Environment-Aware BPMN Collaborations',
        placement: 'Honorable mention'
      },
      {
        title: 'Practicality powerhouse',
        winners: ['Ana Costa', 'Selin Y. Eroglu', 'Kerstin Andree', 'Luise Pufahl'],
        paper: 'A Collection of Publicly Available Event Logs',
        placement: 'Honorable mention'
      },
      {
        title: 'Future forward',
        winners: ['Finn Klessascheck', 'Yannic Seibert', 'Luise Pufahl'],
        paper: 'Capturing Environmental Impacts of Business Processes with Camunda and the SOPA Framework',
        placement: 'Honorable mention'
      },
      {
        title: 'Explain-it-like-I’m-five',
        winners: [
          'Jack Edh', 'Tuva Falk', 'Filip Kanon', 'Erik Simonsson',
          'Hugo Sjödin', 'Jonatan Wincent', 'Elisabeth Barar',
          'Robert Blümel', 'Lukas Kirchdorfer'
        ],
        paper: 'A Business Process Simulation Tool Bridging Control-Flow and Resource-Centric Paradigms',
        placement: 'Honorable mention'
      },
      {
        title: 'Tech wizardry',
        winners: ['Nataliia Klievtsova', 'Matthias Ehrendorfer', 'Juergen Mangler', 'Stefanie Rinderle-Ma'],
        paper: 'AutoBPMN.AI: Conversational Process Modeling and Automation',
        placement: 'Honorable mention'
      }
    ]
  }
];

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
    name: 'Main Track',
    date: 'Tuesday, Sept 2nd, 2025 - Thursday, Sept 4th, 2025',
    location: '"Giralda" Hall',
    tables: [
      {
        title: 'Session 1 - Tuesday, Sept 2nd, 2025 (11:00 - 13:00): Predictive Process Monitoring',
        showRowIndex: false,
        rows: [
          {
            Title: 'A Simple and Calibrated Approach for Uncertainty-Aware Remaining Time Prediction',
            Authors: 'Keyvan Amiri Elyasi, Han van der Aa and Heiner Stuckenschmidt',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15538249'
          },
          {
            Title: 'A Human-In-The-Loop Approach for Improving Fairness in Predictive Business Process Monitoring',
            Authors: 'Martin Käppel, Julian Neuberger, Felix Möhrlein, Sven Weinzierl, Martin Matzner and Stefan Jablonski',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15387576'
          },
          {
            Title: 'BEST: Bilaterally Expanding Subtrace Tree for Event Sequence Prediction',
            Authors: 'Simon Rauch, Christian Frey, Andrea Maldonado and Thomas Seidl',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15547095'
          },
          {
            Title: 'Leveraging Temporal Graphs for Enhancing Transformer-based Predictive Process Monitoring',
            Authors: 'Marc C. Hennig and Rainer Schmidt',
            Track: 'Engineering'
          },
          {
            Title: 'Global Predictive Monitoring of Object-Centric Processes',
            Authors: 'Massimiliano De Leoni and Pietro Volpato',
            Track: 'Engineering'
          }
        ]
      },
      {
        title: 'Session 2 - Tuesday, Sept 2nd, 2025 (14:30 - 16:00): Process Discovery and Analysis',
        showRowIndex: false,
        rows: [
          {
            Title: 'Multi-Objective Metaheuristics for Effective and Efficient Process Discovery',
            Authors: 'Hootan Zhian, Rajkumar Buyya and Artem Polyvyanyy',
            Track: 'Engineering'
          },
          {
            Title: 'OC-DECLARE: Discovering Object-Centric Declarative Patterns with Synchronization',
            Authors: 'Aaron Küsters and Wil van der Aalst',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15554279'
          },
          {
            Title: 'Unlocking Non-Block-Structured Decisions: Inductive Mining with Choice Graphs',
            Authors: 'Humam Kourani, Gyunam Park and Wil van der Aalst',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15050973'
          },
          {
            Title: 'Modeling, Formalizing, and Animating Environment-Aware BPMN Collaborations',
            Authors: 'Flavio Corradini, Luca Mozzoni, Jessica Piccioni, Barbara Re, Lorenzo Rossi and Francesco Tiezzi',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15545804'
          }
        ]
      },
      {
        title: 'Session 3 - Tuesday, Sept 2nd, 2025 (16:30 - 18:00): Contextual and Secure Methods in Process Intelligence',
        showRowIndex: false,
        rows: [
          {
            Title: 'MANTA: Materializing Views on Event Data for Context Exploration in Process Analysis',
            Authors: 'Maike Basmer, Hannes Ueck, Dirk Fahland and Matthias Weidlich',
            Track: 'Foundations'
          },
          {
            Title: 'Multi-task trained Graph Neural Network for Business Process Anomaly Detection with a Limited Number of Labeled Anomalies',
            Authors: 'Yongjae Lee, Dohee Kim, Donghwan Kim and Hyerim Bae',
            Track: 'Engineering'
          },
          {
            Title: 'Secrecy Preservation for Online Process Monitoring with Trusted Execution Environment',
            Authors: 'Davide Basile and Claudio Di Ciccio',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15545154'
          }
        ]
      },
      {
        title: 'Session 4 - Wednesday, Sept 3rd, 2025 (11:00 - 13:00): Cognitive and Organizational Dimensions',
        showRowIndex: false,
        rows: [
          {
            Title: 'Identifying Negative Contingencies Within Process Mining Initiatives',
            Authors: 'Astria Hijriani and Marco Comuzzi',
            Track: 'Management'
          },
          {
            Title: 'Mental Maps in Process Mining: Does Stabilizing DFGs Improve Process Analysis Performance?',
            Authors: 'Marie-Christin Häge and Jana-Rebecca Rehse',
            Track: 'Management'
          },
          {
            Title: 'From Temporary Fixes to Informed Decisions—Design Echelons for Evaluating Workarounds',
            Authors: 'Malte Reineke, Bernd Löhr, Agnes Aßbrock, Christian Bartelheimer and Daniel Beverungen',
            Track: 'Management'
          },
          {
            Title: 'Beyond Profit: The Role of Benevolent Business Processes in Building Long-Term Firm Success',
            Authors: 'Thamali Chandrasiri, Nicole Croes, Wasana Bandara, Oktay Turetken, Nadine Ostern, Michael Rosemann and Marleen Voss',
            Track: 'Management'
          },
          {
            Title: 'Light and Dark Presence of Technostress in RPA: Systematic Review of Qualitative Data',
            Authors: 'Kamilla Wells, Rehan Syed, Wasana Bandara and Ignatius Chukwudi',
            Track: 'Management'
          }
        ]
      },
      {
        title: 'Session 5 - Wednesday, Sept 3rd, 2025 (14:30 - 16:00): Simulation, Resource Detection and Optimization',
        showRowIndex: false,
        rows: [
          {
            Title: 'Process Area Extraction by Multilevel Resource Detection for Object-Centric Process Mining',
            Authors: 'Lukas Liß and Wil van der Aalst',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15554409'
          },
          {
            Title: 'Online Discovery of Simulation Models for Evolving Business Processes',
            Authors: 'Francesco Vinci, Gyunam Park, Wil van der Aalst and Massimiliano de Leoni',
            Track: 'Engineering'
          },
          {
            Title: 'A Divide-and-Conquer Approach for Modeling Arrival Times in Business Process Simulation',
            Authors: 'Lukas Kirchdorfer, Konrad Özdemir, Stjepan Kusenic, Han van der Aa and Heiner Stuckenschmidt',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15489114'
          },
          {
            Title: 'Optimization of Activity Batching Policies in Business Processes',
            Authors: 'Orlenys López-Pintado, Jannis Rosenbaum and Marlon Dumas',
            Track: 'Engineering'
          }
        ]
      },
      {
        title: 'Session 6 - Thursday, Sept 4th, 2025 (11:00 - 13:00): Conformance Checking and Temporal Constraints',
        showRowIndex: false,
        rows: [
          {
            Title: 'FoldA: Computing Partial-Order Alignments Using Directed Net Unfoldings',
            Authors: 'Douwe Geurtjens and Xixi Lu',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15552463'
          },
          {
            Title: 'Efficient Conformance Checking of Rich Data-Aware Declare Specifications',
            Authors: 'Jacobo Casas-Ramos, Sarah Winkler, Alessandro Gianola, Marco Montali, Manuel Mucientes and Manuel Lama',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15470076'
          },
          {
            Title: 'A Full Picture in Conformance Checking: Efficiently Summarizing All Optimal Alignments',
            Authors: 'Philipp Bär, Moe Wynn and Sander J. J. Leemans',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15464520'
          },
          {
            Title: 'Aligning Metric Temporal Constraints and Event Logs via Numeric Planning',
            Authors: 'Giacomo Acitelli, Elisa De Bellis, Fabrizio Maria Maggi, Andrea Marrella and Fabio Patrizi',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15561164'
          },
          {
            Title: 'Stochastic Alignments: Matching an Observed Trace to Stochastic Process Models',
            Authors: 'Tian Li, Artem Polyvyanyy and Sander J. J. Leemans',
            Track: 'Foundations'
          }
        ]
      },
      {
        title: 'Session 7 - Thursday, Sept 4th, 2025 (14:30 - 16:00): Detecting Rules and Descriptions',
        showRowIndex: false,
        rows: [
          {
            Title: 'A Step Towards Cognitive Automation: Integrating LLM Agents with Process Rules',
            Authors: 'Sascha Kaltenpoth, Alexander Skolik, Oliver Müller and Daniel Beverungen',
            Track: 'Engineering'
          },
          {
            Title: 'Discovering Multivariate Conditional Rules through Automatic Reasoning-Enhanced Feature Generation for Process Outcome Explanation',
            Authors: 'Catherine Sai and Stefanie Rinderle-Ma',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15472253'
          },
          {
            Title: 'A Procedural Framework for Assessing the Desirability of Process Deviations',
            Authors: 'Michael Grohs, Nadine Cordes and Jana-Rebecca Rehse',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.6084/m9.figshare.28546982'
          },
          {
            Title: 'Ambiguity Detection in Business Process Descriptions: An Evidence and An Automated Approach',
            Authors: 'Hugo A. López, Bingkun Feng, Jonas Lindner, Marco Franceschetti and Amine Abbad-Andaloussi',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15583105'
          }
        ]
      }
    ]
  },
  {
    name: 'BPM Forum',
    location: '"Arenal" Hall',
    date: 'Tuesday, Sept 2nd - Thursday, Sept 4th, 2025',
    tables: [
      {
        title: 'Session 1 - Tuesday, Sept 2nd, 2025 (11:00 - 13:00): Socio-Technical Perspectives in BPM',
        showRowIndex: false,
        rows: [
          {
            Hour: '11:00-11:15',
            Title: 'High-Level Requirements-Driven Business Process Compliance',
            Authors: 'Juanita Caballero-Villalobos, Andrea Burattin and Hugo A. López',
            Track: 'Foundations'
          },
          {
            Hour: '11:15-11:30',
            Title: 'Leveraging the Diamond pattern for Scalable and Upgradeable Blockchain-Based Business Process Execution',
            Authors: 'Victor Lemaire, Tiphaine Henry, Alvaro García, Walid Gaaloul and Sara Tucci Piergiovanni',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15490989'
          },
          {
            Hour: '11:30-11:45',
            Title: 'Balancing Confidentiality and Transparency for Blockchain-based Process-Aware Information Systems',
            Authors: 'Alessandro Marcelletti, Edoardo Marangone, Michele Kryston and Claudio Di Ciccio',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15482587'
          },
          {
            Hour: '11:45-12:00',
            Title: 'Discovering Comprehensive Branched Declarative Process Constraints',
            Authors: 'Christos Balaktsis, Ioannis Mavroudopoulos, Marco Comuzzi, Anastasios Gounaris and Fabrizio Maria Maggi',
            Track: 'Engineering'
          },
          {
            Hour: '12:00-12:15',
            Title: 'A Case for Public Process Documentation: Robodebt an Automated Decision Making System',
            Authors: 'Adam Banham, Azumah Mamudu and Rehan Syed',
            Track: 'Management'
          },
          {
            Hour: '12:15-12:30',
            Title: 'Affective Business Process Management',
            Authors: 'Thomas Grisold and Michael Rosemann',
            Track: 'Management'
          },
          {
            Hour: '12:30-12:45',
            Title: 'FairPM: A Taxonomy of Bias and Interventions in Process Mining',
            Authors: 'Kate Revoredo, Saimir Bala and Flavia Santoro',
            Track: 'Management'
          },
          {
            Hour: '12:45-13:00',
            Title: 'Automation to Agitation: Unveiling RPA-induced Technostress',
            Authors: 'Ishadi Upeksha Meekotuwa Mirispelakotuwa, Rehan Syed and Moe Wynn',
            Track: 'Management'
          }
        ]
      },
      {
        title: 'Session 2 - Wednesday, Sept 3rd, 2025 (11:00 - 13:00): Intelligent Automation and Optimization in BPM',
        showRowIndex: false,
        rows: [
          {
            Hour: '11:00-11:15',
            Title: 'Instance Configuration and Scheduling based on the Resource-Augmented Process Structure Tree',
            Authors: 'Felix Schumann, Wessel van der Heijden and Stefanie Rinderle-Ma',
            Track: 'Foundations'
          },
          {
            Hour: '11:15-11:30',
            Title: 'Progression: A Lightweight BPMN Engine Simplifying the Execution and Monitoring of Process Models',
            Authors: 'Thomas M. Prinz, Yongsun Choi and Anja Vetterlein',
            Track: 'Engineering'
          },
          {
            Hour: '11:30-11:45',
            Title: 'Enhancing Predictive Process Monitoring on Small-Scale Event Logs Using LLMs',
            Authors: 'Alessandro Padella, Paolo Frazzetto, Nicolò Navarin and Massimiliano de Leoni',
            Track: 'Engineering'
          },
          {
            Hour: '11:45-12:00',
            Title: 'SimBank: from Simulation to Solution in Prescriptive Process Monitoring',
            Authors: 'Jakob De Moor, Hans Weytjens, Johannes De Smedt and Jochen De Weerdt',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15574272'
          },
          {
            Hour: '12:00-12:15',
            Title: 'A Rollout-Based Algorithm and Reward Function for Resource Allocation in Business Processes',
            Authors: 'Jeroen Middelhuis, Zaharah Bukhsh, Ivo Adan and Remco Dijkman',
            Track: 'Engineering'
          },
          {
            Hour: '12:15-12:30',
            Title: 'Predicting Newcomer Capabilities and Performance in Process Execution',
            Authors: 'Jing Yang, Chun Ouyang and Remco Dijkman',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.5281/zenodo.15048773'
          },
          {
            Hour: '12:30-12:45',
            Title: 'Detecting Undesired Process Behavior by Means of Retrieval Augmented Generation',
            Authors: 'Michael Grohs, Adrian Rebmann and Jana-Rebecca Rehse',
            Track: 'Engineering',
            Artifact: 'https://doi.org/10.6084/m9.figshare.29125898'
          },
          {
            Hour: '12:45-13:00',
            Title: 'Process Autonomization: Rethinking Business Process Management',
            Authors: 'Christian Janiesch, Marek Kowalkiewicz and Michael Rosemann',
            Track: 'Management'
          }
        ]
      },
      {
        title: 'Session 3 - Thursday, Sept 4th, 2025 (11:00 - 13:00): Process Modeling, Simulation, and Verification',
        showRowIndex: false,
        rows: [
          {
            Hour: '11:00-11:15',
            Title: 'The WHY in Business Processes: Unification of Causal Process Models',
            Authors: 'Yuval David, Fabiana Fournier, Lior Limonad and Inna Skarbovsky',
            Track: 'Foundations'
          },
          {
            Hour: '11:15-11:30',
            Title: 'From Sound Workflow Nets to LTL Declarative Specifications by Casting Three Spells',
            Authors: 'Luca Barbaro, Giovanni Varricchione, Marco Montali and Claudio Di Ciccio',
            Track: 'Foundations',
            Artifact: 'https://zenodo.org/records/15528893'
          },
          {
            Hour: '11:30-11:45',
            Title: 'A Self-Orchestration Model for Business Collaborations with Verifiable Process History Credentials',
            Authors: 'Martin Farkas, Bertalan Zoltán Péter and Imre Kocsis',
            Track: 'Foundations'
          },
          {
            Hour: '11:45-12:00',
            Title: 'Comparing Apples with Oranges: An Assessment Framework for Model-System Similarity',
            Authors: 'Martin Kabierski, Jana-Rebecca Rehse and Jan Martijn van der Werf',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15652385'
          },
          {
            Hour: '12:00-12:15',
            Title: 'Stochastic BPMN and Their Conformance',
            Authors: 'Aleksandar Kuzmanoski, Jan Niklas van Detten and Sander J. J. Leemans',
            Track: 'Foundations'
          },
          {
            Hour: '12:15-12:30',
            Title: 'Rethinking Business Process Simulation: A Utility-Based Evaluation Framework',
            Authors: 'Konrad Özdemir, Lukas Kirchdorfer, Keyvan Amiri Elyasi, Han van der Aa and Heiner Stuckenschmidt',
            Track: 'Foundations',
            Artifact: 'https://doi.org/10.5281/zenodo.15489551'
          },
          {
            Hour: '12:30-12:45',
            Title: 'Layouting Object-Centric Directly Follows Graphs',
            Authors: 'Deoksang Lee, Minseok Song and Wil M.P. van der Aalst',
            Track: 'Engineering'
          }
        ]
      }
    ]
  },
  {
    name: 'Educators Forum',
    date: 'Tuesday, Sept 2nd, 2025',
    tables: [
      {
        title: 'Session 1 (11:00 - 13:00)',
        showRowIndex: false,
        rows: [
          {
            Hour: '11:00-11:15',
            Title: '<i>Opening</i>',
            Authors: 'Chairs'
          },
          {
            Hour: '11:15-11:30',
            Title: 'Educating for Next-Generation BPM: A PBL-Process Mapping Blueprint Anchored in the Drifts of the Digital Era',
            Authors: 'Silvia Dallavalle, Luiz Ricardo Brito Ribeiro and Sérgio Adriany Santos Moreira'
          },
          {
            Hour: '11:30-11:45',
            Title: 'Project-Based Learning in BPM for interdisciplinary groups -- Teachers\' Experience',
            Authors: 'Katarzyna Gdowska, Edyta Brzychczy and Krzysztof Kluza'
          },
          {
            Hour: '11:45-12:00',
            Title: 'Teaching Process Redesign with a Competition',
            Authors: 'Felix Schumann, Matthias Ehrendorfer, Michel Kunkler and Remco Dijkman'
          },
          {
            Hour: '12:00-12:15',
            Title: 'Generative AI\'s aid in (Business) Process Modeling Instructional Design: case study',
            Authors: 'Ilia Maslov, Stephan Poelmans, Yves Wautelet and Kristina Rosenthal'
          },
          {
            Hour: '12:15-12:30',
            Title: 'Revisiting BPMN Assignments with AI in Mind: Insights from Experiments with Large Language Models in Process Modeling Education',
            Authors: 'Krzysztof Kluza, Marzena Grzesiak, Piotr Śliz and Leszek Szala'
          },
          {
            Hour: '12:30-12:45',
            Title: 'Comparing the Design Space of Explorative BPM: MBAs versus genAI',
            Authors: 'Michael Rosemann and Philipp Joebges'
          }
        ]
      },
      {
        title: 'Session 2 (14:30 - 16:00)',
        showRowIndex: false,
        rows: [
          {
            Hour: '14:30-15:30',
            Title: 'Keynote by Deniz Iren: AI Tutors in Practice: Lessons from the Field',
            Authors: 'Deniz Iren'
          },
          {
            Hour: '15:30-15:45',
            Title: 'Improving the practice of acquiring knowledge in the field of BPM – a pedagogical framework',
            Authors: 'Patrycja Hoffa-Dąbrowska and Katarzyna Grzybowska'
          },
          {
            Hour: '15:45-16:00',
            Title: 'Building BPM Talent in Emerging Markets: A 10-Year Curriculum',
            Authors: 'Tolusha Dahanayake Yapa, S.W.S.B. Dassanayaka, H.A.D.R. Gunarathne, Prasanna Illankoon, Harishani Liyanage, I.R. Malawige, K.M.S. Senevirathne, Methsiri Suwandaarachchi, Vathsala Wickramasinghe and Amali Wijekoon'
          }
        ]
      },
      {
        title: 'Session 3 (16:30 - 18:00)',
        showRowIndex: false,
        rows: [
          {
            Hour: '16:30-16:45',
            Title: 'Process Mining for Predicting Failure To Rescue: a Case Study',
            Authors: 'Reyes Grangel, Noelia Palomares, María Sánchez-Galán, David Luna-Aleixos and Irene Llagostera-Reverter'
          },
          {
            Hour: '16:45-17:00',
            Title: 'Education as an affordance actualization driver - Investigating learning data from a Process Mining Ecosystem',
            Authors: 'Adrian Joas'
          },
          {
            Hour: '17:00-17:15',
            Title: 'Bridging the BPM Education Gap: Reflections on Affordances of BPM Techniques and a Call for Collaboration',
            Authors: 'Mahendrawathi Er and Avisha Nathania'
          },
          {
            Hour: '17:15-17:30',
            Title: 'The Envisioned Global Process Institute: Transforming BPM Education through EaaS and Process Learners in a B2P Model',
            Authors: 'Andrea Magdaleno and Michael Rosemann'
          },
          {
            Hour: '17:30-18:00',
            Title: '<i>Closing & Wrap-up</i>'
          }
        ]
      }
    ]
  },
  {
    name: 'Process Technology Forum',
    location: '"Nervión" Hall',
    date: 'Tuesday, Sept 2nd, 2025',
    tables: [
      {
        title: 'Session 1 (11:00 - 13:00): Mathias Weske, Remco Dijkman',
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
        title: 'Session 2 (14:30 - 16:00): Dimka Karastoyanova',
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
        title: 'Session 1 (11:00 - 13:00)',
        rows: [
          {
            Hour: '11:00',
            Title: '<i>Opening</i>',
            Authors: 'Chairs'
          },
          {
            Hour: '11:05',
            Title: 'Impact of Process Redesign: A Case Study from Indonesian Higher Education Data Reporting',
            Authors: 'Indri Sudanawati Rozas, Sugianto Halim, Mahendrawathi Er and Arif Wibisono'
          },
          {
            Hour: '11:20',
            Title: 'Compliance Checking in Action for INGKA Group Inventory Management',
            Authors: 'Alessio Galassi, Barbara Re, Stefan Reimann and Lorenzo Rossi'
          },
          {
            Hour: '11:35',
            Title: 'CreaDev - A Structured Framework for Embedding Creativity in Business Process Management',
            Authors: 'Jasmin Fattah-Weil, Jako Roder, Lydia Schäfer, Doris Fay and Norbert Gronau'
          },
          {
            Hour: '11:50',
            Title: 'The process orientation in the Agencia Digital de Andalucia',
            Authors: 'Juan Sebastián Ojeda Pérez, Elena Sauci Sánchez and Juan Francisco Fernández Ramos'
          },
          {
            Hour: '12:05',
            Title: 'Automating Financial Reconciliation: Leveraging RPA for Efficiency and Accuracy in Banking Operations',
            Authors: 'Elheme Azemi and Saimir Bala'
          },
          {
            Hour: '12:20',
            Title: 'From Silos to Synergy: Embedding BPM at Sri Lanka Telecom to Drive Strategic Alignment',
            Authors: 'Dinusha Rajapaksha, Wasana Bandara, Naleen Jayasuriya, Bandula Wimalasuriya, Rehan Syed and Ishadi Mirispelakotuwa'
          },
          {
            Hour: '12:35',
            Title: 'Round table: retrospectives and common trends on how BPM is changing the industry',
            Authors: 'All authors + audience'
          }
        ]
      },
      {
        title: 'Session 2 (14:30 - 16:00)',
        rows: [
          {
            Hour: '-',
            Title: 'Focus Groups: Grand Challenges and Opportunities in the adoption of BPM in industry and the public sector'
          },
          {
            Hour: '14:30',
            Title: 'Introduction of the dynamics by the chairs'
          },
          {
            Hour: '14:35',
            Title: 'Focused Discussion and appointment of speaker'
          },
          {
            Hour: '15:40',
            Title: 'Selected speakers gives a retrospective of the discussion'
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
        title: 'Session 1 (11:00 - 13:00)',
        rows: [
          {
            Hour: '11:00',
            Title: 'Keynote',
            Authors: 'Jan Mendling'
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
        title: 'Session 2 (14:30 - 16:00)',
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
            Hour: '15:45',
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

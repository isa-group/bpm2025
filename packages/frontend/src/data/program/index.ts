import type { Arrayable } from 'type-fest';
import type { ComponentProps } from 'astro/types';
import type { Item } from '#/types';
import type Table from '#/components/ui/Table.astro';
import { locations } from '#/data/program/locations';

export interface ProgramOverview {
  name: string;
  date?: string;
  location?: Arrayable<typeof locations[keyof typeof locations]>;
  /* eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents */
  tables?: (ComponentProps<typeof Table> & { description?: string })[];
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
    location: locations.giralda,
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
    location: locations.arenal,
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
        title: 'Session 1 (11:00 - 13:00): Technology Enhanced Learning',
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
        title: 'Session 2 (14:30 - 16:00): Curriculum Innovation',
        showRowIndex: false,
        description: `
**Keynote Summary – AI Tutors in Practice: Lessons from the Field**
          
In this keynote, Deniz Iren will present the Augmented Reality Tutor (ART),
which is a virtual AI tutor currently used by over a thousand students and
piloted in seven universities across four countries.
He will explain the core technology and the pedagogy-first, teacher-centric
approach behind ART, share insights from its deployment in real educational
settings, and reflect on how AI is reshaping learning environments.
The session will conclude with a hands-on demo of ART and an interactive
discussion on the future of education in the AI age.
<br />
<br />
**Deniz Iren** is an Associate Professor at the Open Universiteit in the
Netherlands. His work focuses on affective computing, AI regulation, and
the application of AI in education. He is the creator of the
Augmented Reality Tutor (ART), an award-winning AI tutor designed to deliver
personalized, safe, and scalable learning support. His educational
innovation efforts have earned him a Comenius Teaching Fellowship (2023) and
the Education Product of the Year Award (2024).
Outside of academia, Deniz is a passionate adventure race athlete and
ultramarathon runner.
        `.trim(),
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
        title: 'Session 3 (16:30 - 18:00): Bridging Academia & Industry',
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
    location: locations.nervion,
    date: 'Tuesday, Sept 2nd, 2025',
    tables: [
      {
        title: 'Session 1 (11:00 - 13:00): Mathias Weske, Remco Dijkman',
        description: `
**Keynote Summary – Process Systems in the Era of Artificial Intelligence**
          
The talk begins by showcasing a variety of compelling
real-world applications of process systems, for example, within the
manufacturing sector. These examples highlight what can be achieved
through process systems, i.e., process automation, contextual data
acquisition, and the seamless integration of Business Process Management
and the Internet of Things. Then, we will explore how recent
breakthroughs in Artificial Intelligence (AI) can be harnessed to
accelerate the development of process systems by keeping the human in
the loop. Conversely, we outline how process systems themselves can
shape and steer AI-driven solutions by providing framed autonomy through
agentic process orchestration.
<br />
<br />
**Stefanie Rinderle-Ma** is a full professor at the Technical
University of Munich, Germany, and holds the Chair of Information
Systems and Business Process Management. Her research interests focus on
process-oriented information systems, flexible and distributed process
technologies, compliance management, as well as production and process
intelligence. The overarching goal of her research is to enable and
accelerate digitalization and automation through processes and at the
same time keep the human in the loop. Application areas comprise
manufacturing and health care.
        `.trim(),
        rows: [
          {
            Hour: '11:00',
            Title: '<i>Opening</i>',
            Authors: 'PC Chairs'
          },
          {
            Hour: '11:10',
            Title: 'Keynote: Process Systems in the Era of Artificial Intelligence',
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
    location: locations.nervion,
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
            Title: 'From Silos to Synergy: Embedding BPM at Sri Lanka Telecom to Drive Strategic Alignment',
            Authors: 'Dinusha Rajapaksha, Wasana Bandara, Naleen Jayasuriya, Bandula Wimalasuriya, Rehan Syed and Ishadi Mirispelakotuwa'
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
            Title: 'Impact of Process Redesign: A Case Study from Indonesian Higher Education Data Reporting',
            Authors: 'Indri Sudanawati Rozas, Sugianto Halim, Mahendrawathi Er and Arif Wibisono'
          },
          {
            Hour: '12:35',
            Title: 'Round table: retrospectives and common trends on how BPM is changing the industry',
            Authors: 'All authors + audience'
          }
        ]
      },
      {
        title: 'Session 2 (14:30 - 16:00): Focus Groups: Grand Challenges and Opportunities in the adoption of BPM in industry and the public sector',
        rows: [
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
    location: locations.nervion,
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
    location: [locations.triana, locations.arenal],
    date: 'Tuesday,  Wednesday & Thursday, Sept 2nd–4rd, 2025',
    items: [
      {
        title: 'Tutorial 1: <u>AI-Assisted Business Process Monitoring</u> - Tuesday, Sept 2nd, 2025 (16:30 - 18:00) - Arenal Hall',
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
        title: 'Tutorial 2: <u>Constraint-based reasoning and analysis for BPM: CSP to the rescue</u> - Wednesday, Sept 3rd, 2025 (14:30 - 16:00) - Nervion Hall',
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
        title: 'Tutorial 3: <u>Business Process Optimization</u> - Thursday, Sept 4th, 2025 (14:30 - 16:00) - Nervion Hall',
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
  },
  {
    name: 'Demos & Resources',
    location: locations.sta_cruz,
    date: 'Wednesday, Sept 3rd, 2025',
    tables: [
      {
        title: 'Session (16:30 - 18:00)',
        description: `
There is a demos & resources teaser session after the keynote that day: from 10:15 to 10:30.
        `.trim(),
        rows: [
          {
            Title: 'BPMNinvest: Feedback on Change in Process Models',
            Authors: 'Thomas M. Prinz and Yongsun Choi'
          },
          {
            Title: 'Capturing Environmental Impacts of Business Processes with Camunda and the SOPA Framework',
            Authors: 'Finn Klessascheck, Yannic Seibert and Luise Pufahl'
          },
          {
            Title: 'Easy and Efficient Object-Centric Process Querying with the OCPQ Tool',
            Authors: 'Aaron Küsters and Wil van der Aalst'
          },
          {
            Title: 'FrAIm: A What-If Analysis Tool Enabling Framed Autonomy via Automated Planning',
            Authors: 'Paul Wittlinger, Giacomo Acitelli, Anti Alman, Fabrizio Maria Maggi and Andrea Marrella'
          },
          {
            Title: 'BEAR 2.0: enhancing the environment model for animating environment-aware BPMN collaborations',
            Authors: 'Flavio Corradini, Luca Mozzoni, Jessica Piccioni, Barbara Re, Lorenzo Rossi and Francesco Tiezzi'
          },
          {
            Title: "PyStack't: Real-Life Data for Object-Centric Process Mining",
            Authors: 'Lien Bosmans, Jari Peeperkorn and Johannes De Smedt'
          },
          {
            Title: 'Kogui: A tool for assessing High-Level Business Process Compliance',
            Authors: 'Juanita Caballero Villalobos and Hugo A. López'
          },
          {
            Title: 'Process Copilots: Scaling Process Mining Through Conversational Interfaces',
            Authors: 'Carolin Ullrich, Teodora Lata and Alexander Seeliger'
          },
          {
            Title: 'A Business Process Simulation Tool Bridging Control-Flow and Resource-Centric Paradigms',
            Authors: 'Jack Edh, Tuva Falk, Filip Kanon, Erik Simonsson, Hugo Sjödin, Jonatan Wincent, Elisabeth Barar, Robert Blümel and Lukas Kirchdorfer'
          },
          {
            Title: 'GymPN: a Python Library for Automated Decision-Making in Process Management Systems',
            Authors: 'Riccardo Lo Bianco, Willem van Jaarsveld and Remco Dijkman'
          },
          {
            Title: 'BROOM: Toolbox for IoT-Enhanced Process Mining',
            Authors: 'Christian Imenkamp, Yannis Bertrand, Joscha Grüger, Lukas Malburg, Marco Franceschetti, Matthias Ehrendorfer and Agnes Koschmider'
          },
          {
            Title: 'DCR-JS: An Online Environment for Declarative Process Mining',
            Authors: 'Axel K.F. Christfort and Hugo A. López'
          },
          {
            Title: 'A Visual Analytics Tool for Multi-Dimensional Resource Insights in Process Mining',
            Authors: 'Alana Hoogmoed, Maximilian Schoditsch and Djordje Djurica'
          },
          {
            Title: 'FairLoop: Software Support for Human-Centric Fairness in Predictive Business Process Monitoring',
            Authors: 'Felix Möhrlein, Martin Käppel, Julian Neuberger, Sven Weinzierl, Lars Ackermann, Martin Matzner and Stefan Jablonski'
          },
          {
            Title: 'A training framework for BPM Modeling interviews based on LLM assistants',
            Authors: 'Bedilia Estrada-Torres, José Antonio Parejo, Armando Fox and Pablo Fernández'
          },
          {
            Title: 'A Collection of Publicly Available Event Logs',
            Authors: 'Ana Costa, Selin Y. Eroglu, Kerstin Andree and Luise Pufahl'
          },
          {
            Title: 'BPMN-Chatbot++: LLM-Based Modeling of Collaboration Diagrams with Data',
            Authors: 'Aya Safan and Julius Köpke'
          },
          {
            Title: 'AutoBPMN.AI: Conversational Process Modeling and Automation',
            Authors: 'Nataliia Klievtsova, Matthias Ehrendorfer, Juergen Mangler and Stefanie Rinderle-Ma'
          },
          {
            Title: 'Sequen-C Explorer for Process Mining',
            Authors: 'Luis Montana and Maria-Cruz Villa-Uriol'
          },
          {
            Title: 'A Library for Detecting Inconsistencies in Declarative Process Models',
            Authors: 'Sabine Nagel and Patrick Delfmann'
          },
          {
            Title: 'Declarative Process Mining with MINERful, Reloaded',
            Authors: 'Cecilia Iacometta and Claudio Di Ciccio'
          }
        ]
      }
    ]
  },
  {
    name: 'Journal First Track',
    location: [locations.triana, locations.arenal],
    date: 'Tuesday & Wednesday, Sept 2nd–3rd, 2025',
    tables: [
      {
        title: 'Session 1 (Tuesday 14:30 - 16:00)',
        rows: [
          {
            Title: 'SOPA: a framework for sustainability-oriented process analysis and re-design in business process management',
            Authors: 'Finn Klessascheck, Ingo Weber and Luise Pufahl'
          },
          {
            Title: 'Challenges in AI-supported Process Analysis in the Italian Judicial System: what After Digitalization?',
            Authors: 'Devis Bianchini, Carlo Bono, Alessandro Campi, Cinzia Cappiello, Stefano Ceri, Francesca De Luzi, Massimo Mecella, Barbara Pernici and Pierluigi Plebani'
          },
          {
            Title: 'Unlocking the promise of process mining: shaping perceptions and impact in the public sector',
            Authors: 'Serena Racis and Alessandro Spano'
          },
          {
            Title: 'Timeline-based process discovery',
            Authors: 'Christoffer Rubensson, Harleen Kaur, Timotheus Kampik and Jan Mendling'
          },
          {
            Title: 'Efficient Online Computation of Business Process State From Trace Prefixes via N-Gram Indexing',
            Authors: 'David Chapela-Campa and Marlon Dumas'
          },
          {
            Title: 'Stochastic Conformance Checking based on Variable-length Markov Chains',
            Authors: 'Emilio Incerto, Andrea Vandin and Sima Sarv Ahrabi'
          },
          {
            Title: 'Soundness unknotted: An efficient soundness checking algorithm for arbitrary cyclic process models by loosening loops',
            Authors: 'Thomas M. Prinz, Yongsun Choi and N. Long Ha'
          },
          {
            Title: 'On Process Discovery Experimentation: Addressing the Need for Research Methodology in Process Discovery',
            Authors: 'Jana-Rebecca Rehse, Sander J.J. Leemans, Peter Fettke and Jan Martijn van der Werf'
          }
        ]
      },
      {
        title: 'Session 2 (Tuesday 16:30 - 18:00)',
        rows: [
          {
            Title: 'Analyzing Healthcare Processes with Incremental Process Discovery: Practical Insights from a Real-World Application',
            Authors: 'Daniel Schuster, Elisabetta Benevento, Davide Aloini and Wil van der Aalst'
          },
          {
            Title: 'Predicting radiology service times for enhancing emergency department management',
            Authors: 'Davide Aloini, Elisabetta Benevento, Marco Berdini and Alessandro Stefanini'
          },
          {
            Title: 'Human Behavior Mining: A Framework for Theorizing About mHealth Behavior Using Digital Trace Data',
            Authors: 'Fallon Monica, Jana-Rebecca Rehse and Armin Heinzl'
          },
          {
            Title: 'The WHY in Business Processes: Discovery of Causal Execution Dependencies',
            Authors: 'Fabiana Fournier, Lior Limonad, Inna Skarbovsky and Yuval David'
          },
          {
            Title: 'Intervention strategies for improving business process outcomes: A causal rule mining approach',
            Authors: 'Rik Eshuis and Laura Genga'
          },
          {
            Title: 'Approaches for IoT-enhanced predictive process monitoring',
            Authors: 'Yannis Bertrand, Alexander Stevens, Boje Deforce, Johannes De Smedt, Jochen De Weerdt and Estefanía Serral'
          },
          {
            Title: 'Supporting business confidentiality in coopetitive scenarios: The B-CONFIDENT approach in blockchain-based supply chains',
            Authors: 'Simone Agostinelli, Ala Arman, Francesca De Luzi, Flavia Monti, Michele Manglaviti and Massimo Mecella'
          },
          {
            Title: 'Effective presentation of ontological overlap of multiple conceptual models',
            Authors: 'Djordje Djurica, Araz Jabbari, Jan Mendling and Jan Recker'
          }
        ]
      },
      {
        title: 'Session 3 (Wednesday 16:30 - 18:00)',
        rows: [
          {
            Title: 'How do digital Startups Manage Their Activities? Insights and Opportunities for Business Process Management',
            Authors: 'Mahendrawathi Er, Natasha Ratna Puspita Mulyono, Ivan Althirafi Rentio and Ika Nurkasanah'
          },
          {
            Title: 'How do Process Mining Users Act, Think, and Feel? An Explorative Study of Process Mining Use Patterns',
            Authors: 'Jana Ammann, Laura Lohoff, Bastian Wurm and Thomas Hess'
          },
          {
            Title: 'How well can a large language model explain business processes as perceived by users?',
            Authors: 'Dirk Fahland, Fabiana Fournier, Lior Limonad, Inna Skarbovsky and Ava Swevels'
          },
          {
            Title: 'Workarounds as a Cause of Mismatches in Business Processes—Insights from a Multiple Case Study',
            Authors: 'Christian Bartelheimer, Bernd Löhr, Malte Reineke, Agnes Assbrock and Daniel Beverungen'
          },
          {
            Title: 'On the application of process management and process mining to Industry 4.0',
            Authors: 'Flavia Monti, Jerin George Mathew, Francesco Leotta, Agnes Koschmider and Massimo Mecella'
          },
          {
            Title: 'Orchestration of Services in Smart Manufacturing Through Automated Synthesis',
            Authors: 'Flavia Monti, Luciana Silo, Marco Favorito, Giuseppe De Giacomo, Francesco Leotta and Massimo Mecella'
          },
          {
            Title: 'An Interactive Error-correcting Approach for IoT-sourced Event Logs',
            Authors: 'Mohsen Shirali, Zahra Ahmadi, Carlos Fernández-Llatas, José Luis Bayo Montón and Gemma Di Federico'
          }
        ]
      }
    ]
  },
  {
    name: 'Doctoral Consortium',
    location: [locations.estepa, locations.flexy, locations.tech],
    date: 'Sunday, Aug 31st, 2025',
    tables: [
      {
        title: 'Opening (9:00 - 9:15) - Estepa Hall',
        short: 'Opening',
        rows: [
          { Time: '09:00', Title: 'Opening (all)' }
        ]
      },

      // Morning parallel block — 1.1 / 2.1 / 3.1
      {
        title: 'Session 1.1: Predictive Process Monitoring (9:15 - 10:45) - Estepa Hall',
        short: 'Session 1.1',
        rows: [
          {
            Time: '09:15',
            Title: 'Exploiting and Predicting System-Wide Behaviors for Predictive Process Monitoring',
            Authors: 'Xiaomeng He'
          },
          {
            Time: '10:00',
            Title: 'A Framework for Multidimensional Business Process Forecasting',
            Authors: 'Aurélie Leribaux'
          }
        ]
      },
      {
        title: 'Session 1.2: Process Engineering (09:15 - 10:45) - Flexy Hall',
        rows: [
          {
            Time: '09:15',
            Title: 'Observability and Explainability in Data-Driven Process Simulation',
            Authors: 'Robert Blümel'
          },
          {
            Time: '10:00',
            Title: 'Cyber Security for Business Processes: Automating Security Enhancement Along Process Lifecycle',
            Authors: 'Moshe Hadad'
          }
        ]
      },
      {
        title: 'Session 1.3: Practical Aspects (09:15 - 10:45) - Tech Hall',
        rows: [
          {
            Time: '09:15',
            Title: 'Green BPM Solutions for Sustainable Business Processes',
            Authors: 'Finn Klessascheck'
          },
          {
            Time: '10:00',
            Title: 'Visual Process Mining over Time and Space',
            Authors: 'Christoffer Rubensson'
          }
        ]
      },

      // Late-morning parallel block — 1.2 / 2.2 / 3.2
      {
        title: 'Session 2.1: Process Mining Paradigms (11:15 - 12:45) - Estepa Hall',
        short: 'Session 2.1',
        rows: [
          {
            Time: '11:15',
            Title: 'Compliance Checking: from Object-Centric Process Mining to Blockchain',
            Authors: 'Alessio Galassi'
          },
          {
            Time: '12:00',
            Title: 'Stochastic Process Mining',
            Authors: 'Tian Li'
          }
        ]
      },
      {
        title: 'Session 2.2: Process Automation (11:15 - 12:45) - Flexy Hall',
        rows: [
          {
            Time: '11:15',
            Title: 'Knowledge Graph Reasoning for Intelligent and Explainable Business Process Technologies',
            Authors: 'Leon Bein'
          },
          {
            Time: '12:00',
            Title: 'Explainable Fully Automated Business Process Redesign',
            Authors: 'Maximilian Harl'
          }
        ]
      },
      {
        title: 'Session 2.3: Process Analysis (11:15 - 12:45) - Tech Hall',
        rows: [
          {
            Time: '11:15',
            Title: 'Cognitive Elements in Exploratory Process Analysis: From Novice to Expert',
            Authors: 'Gythe Stans'
          },
          {
            Time: '12:00',
            Title: 'Impact of Process Mining Tools on Process Analysis',
            Authors: 'Dries Jarijch'
          }
        ]
      },

      // Afternoon parallel block — 1.3 / 2.3 / 3.3
      {
        title: 'Session 3.1: BPM in Context (14:15 - 15:45) - Estepa Hall',
        short: 'Session 3.1',
        rows: [
          {
            Time: '14:15',
            Title: 'A BPM-based approach to executing contextualized actions in multidomain IoT systems',
            Authors: 'Adrián Bazan-Muñoz'
          },
          {
            Time: '15:00',
            Title: 'Modeling and verifying environment-aware BPMN collaborations',
            Authors: 'Jessica Piccioni'
          }
        ]
      },
      {
        title: 'Session 3.2: Process mining in healthcare (14:15 - 15:45) - Flexy Hall',
        rows: [
          {
            Time: '14:15',
            Title: 'Using Process Mining to connect Process Orientation and Data-driven Decision Making in healthcare: a qualitative assessment and integration of new data sources',
            Authors: 'Maxim Riebus'
          },
          {
            Time: '15:00',
            Title: 'Unlocking Nursing Work Organization Insights through Integrated HIS and RTLS Data: Novel Methods and Applications',
            Authors: 'Haroon Tharwat'
          }
        ]
      },
      {
        title: 'Session 3.3: Processes & People (14:15 - 15:45) - Tech Hall',
        rows: [
          {
            Time: '14:15',
            Title: 'Embedding Benevolence into Business Processes - AI-Enabled Routinized Benevolence',
            Authors: 'Thamali Chandrasiri'
          },
          {
            Time: '15:00',
            Title: 'Unveiling Dynamics Between Robotic Process Automation and Process Knowledge Loss',
            Authors: 'Ishadi Upeksha Meekotuwa Mirispelakotuwa'
          }
        ]
      },
      {
        title: 'Panel (16:15 - 17:15) - Estepa Hall',
        short: 'Panel',
        rows: [
          { Time: '16:15', Title: 'Panel (all)' }
        ]
      }
    ]
  }
];

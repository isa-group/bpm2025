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

const ai4bpmUrl = 'https://sites.google.com/unitn.it/ai4bpm-2025';
const automateUrl = 'https://sites.google.com/diag.uniroma1.it/automate-2025';
const bpMeetIotUrl = 'https://bp-meet-iot.webs.upv.es/';
const prodyUrl = 'https://prody.ai.wu.ac.at/';
const dlt4bpmUrl = 'https://dlt4bpm.github.io/';
const fmbpmUrl = 'https://fm-bpm2025.github.io/';
const innov8bpmUrl = 'https://sites.google.com/view/innov8bpm';
const nlp4bpmUrl = 'https://sites.google.com/view/nlp4bpm2025/';
const objectsUrl = 'https://sites.google.com/view/objects-workshop';
const plcUrl = 'https://plc.di.unito.it/';
const vipraUrl = 'https://vipra-workshop.github.io/homepage/';

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
        short: 'main-track-s1',
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
        short: 'main-track-s2',
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
        short: 'main-track-s3',
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
        short: 'main-track-s4',
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
        short: 'main-track-s5',
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
        short: 'main-track-s6',
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
        short: 'main-track-s7',
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
    location: locations.magnolia,
    date: 'Tuesday, Sept 2nd - Thursday, Sept 4th, 2025',
    tables: [
      {
        title: 'Session 1 - Tuesday, Sept 2nd, 2025 (11:00 - 13:00): Socio-Technical Perspectives in BPM',
        short: 'bpm-forum-s1',
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
        short: 'bpm-forum-s2',
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
        short: 'bpm-forum-s3',
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
    location: [locations.triana, locations.magnolia],
    tables: [
      {
        title: 'Session 1 (11:00 - 13:00, Triana Hall): Technology Enhanced Learning',
        short: 'educators-forum-s1',
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
        title: 'Session 2 (14:30 - 16:00, Magnolia Hall): Curriculum Innovation',
        short: 'educators-forum-s2',
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
        title: 'Session 3 (16:30 - 18:00, Magnolia Hall): Bridging Academia & Industry',
        short: 'educators-forum-s3',
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
        short: 'process-technology-forum-s1',
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
        short: 'process-technology-forum-s2',
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
        short: 'industry-forum-s1',
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
        short: 'industry-forum-s2',
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
        short: 'responsible-bpm-forum-s1',
        description: `
**Keynote Summary – Increasing Justice with Responsible BPM**
The Responsible BPM Forum was established with the aim to develop concepts that account for the needs of stakeholders involved in business processes, the broader environment and society in more general terms. In this talk, we will discuss concepts from organizational justice as a potential theoretical basis. We describe challenges for distributive and procedural justice and point to conflicts with classical process performance dimensions of the devil's quadrangle. We conclude with some suggestions for future research on responsible BPM.
<br />
<br />
**Jan Mendling** is the Einstein-Professor of Process Science with the Department of Computer Science at Humboldt-Universität zu Berlin, Germany. He is also adjunct professor with Vienna University of Economics and Business, Austria, Principle Investigator at the Weizenbaum Institute, Berlin, Germany, and Co-Founder of Noreja Intelligence GmbH. His research interests include various topics in the area of business process management and information systems. He has published more than 500 research papers and articles, among others in Management Information Systems Quarterly, ACM Transactions on Software Engineering and Methodology, IEEE Transactions on Software Engineering, Journal of the Association of Information Systems, European Journal of Information Systems, Information Systems, and Decision Support Systems. He is the founding co-Editor-in-Chief of Process Science and co-author of the textbooks Fundamentals of Business Process Management, Second Edition, and Wirtschaftsinformatik, 12th Edition.
        `.trim(),
        rows: [
          {
            Hour: '11:00',
            Title: 'Keynote: Increasing Justice with Responsible BPM',
            Authors: 'Jan Mendling'
          },
          {
            Hour: '11:40',
            Title: 'ReDPT-CT: Designing Responsible Digital Process Twins for Clinical Trials',
            Authors: 'Luiz Ricardo Brito Ribeiro, Silvia Inês Dallavalle de Pádua, Gerald Kremer and Rainer Stark'
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
        short: 'responsible-bpm-forum-s2',
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
            Title: 'The Impact of Event Data Partitioning on Privacy-aware Process Discovery',
            Authors: 'Jungeun Lim, Stephan Fahrenkrog-Petersen, Xixi Lu, Jan Mendling and Minseok Song'
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
    location: [locations.nervion, locations.magnolia],
    date: 'Tuesday,  Wednesday & Thursday, Sept 2nd–4rd, 2025',
    items: [
      {
        title: 'Tutorial 1: <u id="tutorials-s1">AI-Assisted Business Process Monitoring</u> - Tuesday, Sept 2nd, 2025 (16:30 - 18:00) - Nervion Hall',
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
        title: 'Tutorial 2: <u id="tutorials-s2">Constraint-based reasoning and analysis for BPM: CSP to the rescue</u> - Wednesday, Sept 3rd, 2025 (14:30 - 16:00) - Magnolia Hall',
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
        title: 'Tutorial 3: <u id="tutorials-s3">Business Process Optimization</u> - Thursday, Sept 4th, 2025 (14:30 - 16:00) - Magnolia Hall',
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
        short: 'demos-&-resources-s1',
        title: 'Teaser Session (10:15 - 10:30) - Giralda Hall',
        rows: [
          {
            Title: 'Demos & Resources teaser session'
          }
        ]
      },
      {
        title: 'Session (16:30 - 18:00)',
        short: 'demos-&-resources-s2',
        rows: [
          {
            Title: 'BPMNinvest: Feedback on Change in Process Models (<a href="https://www.youtube.com/watch?v=fHmVLcOeMZI" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Thomas M. Prinz and Yongsun Choi'
          },
          {
            Title: 'Capturing Environmental Impacts of Business Processes with Camunda and the SOPA Framework (<a href="https://figshare.com/s/0a7c2e558c935ca8d5c8?file=55758965" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Finn Klessascheck, Yannic Seibert and Luise Pufahl'
          },
          {
            Title: 'Easy and Efficient Object-Centric Process Querying with the OCPQ Tool (<a href="https://github.com/aarkue/ocpq-demo" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Aaron Küsters and Wil van der Aalst'
          },
          {
            Title: 'FrAIm: A What-If Analysis Tool Enabling Framed Autonomy via Automated Planning (<a href="https://www.youtube.com/watch?v=Ty2JsRhHewM" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Paul Wittlinger, Giacomo Acitelli, Anti Alman, Fabrizio Maria Maggi and Andrea Marrella'
          },
          {
            Title: 'BEAR 2.0: enhancing the environment model for animating environment-aware BPMN collaborations (<a href="https://www.youtube.com/watch?v=zpFFFm9GWgk" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Flavio Corradini, Luca Mozzoni, Jessica Piccioni, Barbara Re, Lorenzo Rossi and Francesco Tiezzi'
          },
          {
            Title: 'PyStack\'t: Real-Life Data for Object-Centric Process Mining (<a href="https://www.youtube.com/watch?v=AS8wI90wRM8" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Lien Bosmans, Jari Peeperkorn and Johannes De Smedt'
          },
          {
            Title: 'Kogui: A tool for assessing High-Level Business Process Compliance (<a href="https://www.youtube.com/watch?v=apvBapize3w&list=PLyDC1uU6L39NIE6LoAkiOQom_dJ16QUbB&index=1" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Juanita Caballero Villalobos and Hugo A. López'
          },
          {
            Title: 'Process Copilots: Scaling Process Mining Through Conversational Interfaces (<a href="https://videos.celonis.com/watch/A2pknwmiMLgbWS8C5ZoWqq" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Carolin Ullrich, Teodora Lata and Alexander Seeliger'
          },
          {
            Title: 'A Business Process Simulation Tool Bridging Control-Flow and Resource-Centric Paradigms (<a href="https://www.youtube.com/watch?v=RF_lYoKAo8E" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Jack Edh, Tuva Falk, Filip Kanon, Erik Simonsson, Hugo Sjödin, Jonatan Wincent, Elisabeth Barar, Robert Blümel and Lukas Kirchdorfer'
          },
          {
            Title: 'GymPN: a Python Library for Automated Decision-Making in Process Management Systems (<a href="https://www.youtube.com/watch?v=2N7DW67NxqI" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Riccardo Lo Bianco, Willem van Jaarsveld and Remco Dijkman'
          },
          {
            Title: 'BROOM: Toolbox for IoT-Enhanced Process Mining (<a href="https://github.com/chimenkamp/IOT-PM-Suite/blob/main/docs/showcase.mp4" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Christian Imenkamp, Yannis Bertrand, Joscha Grüger, Lukas Malburg, Marco Franceschetti, Matthias Ehrendorfer and Agnes Koschmider'
          },
          {
            Title: 'DCR-JS: An Online Environment for Declarative Process Mining (<a href="https://www.youtube.com/watch?v=WxWiyLVU9Sc&list=PLkd-k9LKS0bfkfSGP65a594Z3u92cvLVx&index=1" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Axel K.F. Christfort and Hugo A. López'
          },
          {
            Title: 'A Visual Analytics Tool for Multi-Dimensional Resource Insights in Process Mining (<a href="https://drive.google.com/file/d/12s7jzVY2FMWdXkrhPkifNXaaJ7JoE2ZX/view" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Alana Hoogmoed, Maximilian Schoditsch and Djordje Djurica'
          },
          {
            Title: 'FairLoop: Software Support for Human-Centric Fairness in Predictive Business Process Monitoring (<a href="https://drive.google.com/file/d/1FIfNShThyInZSrNh7WEriRrUCZ_O7JII/view" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Felix Möhrlein, Martin Käppel, Julian Neuberger, Sven Weinzierl, Lars Ackermann, Martin Matzner and Stefan Jablonski'
          },
          {
            Title: 'A training framework for BPM Modeling interviews based on LLM assistants (<a href="https://www.youtube.com/watch?v=ivUeytuOr1c" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Bedilia Estrada-Torres, José Antonio Parejo, Armando Fox and Pablo Fernández'
          },
          {
            Title: 'A Collection of Publicly Available Event Logs',
            Authors: 'Ana Costa, Selin Y. Eroglu, Kerstin Andree and Luise Pufahl'
          },
          {
            Title: 'BPMN-Chatbot++: LLM-Based Modeling of Collaboration Diagrams with Data (<a href="https://www.youtube.com/watch?v=c--1AdTAS-4" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Aya Safan and Julius Köpke'
          },
          {
            Title: 'AutoBPMN.AI: Conversational Process Modeling and Automation (<a href="https://autobpmn.ai/autobpmn.mp4" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Nataliia Klievtsova, Matthias Ehrendorfer, Juergen Mangler and Stefanie Rinderle-Ma'
          },
          {
            Title: 'Sequen-C Explorer for Process Mining (<a href="https://staffwww.dcs.shef.ac.uk/people/M.Villa-Uriol/SequenC-PM/Sequen-C-PM-demo.mp4" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Luis Montana and Maria-Cruz Villa-Uriol'
          },
          {
            Title: 'A Library for Detecting Inconsistencies in Declarative Process Models (<a href="https://videoakademie.ko-ld.de/Panopto/Pages/Viewer.aspx?id=67ee53ba-8e4b-46ed-ac14-b30c00fc69cb" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Sabine Nagel and Patrick Delfmann'
          },
          {
            Title: 'Declarative Process Mining with MINERful, Reloaded (<a href="https://www.youtube.com/watch?v=a6jEWdgS_yY" target="_blank" rel="noopener noreferrer">🎥</a>)',
            Authors: 'Cecilia Iacometta and Claudio Di Ciccio'
          }
        ]
      }
    ]
  },
  {
    name: 'Journal First Track',
    location: [locations.triana, locations.magnolia],
    date: 'Tuesday & Wednesday, Sept 2nd–3rd, 2025',
    tables: [
      {
        title: 'Session 1 (Tuesday 14:30 - 16:00)',
        short: 'journal-first-track-s1',
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
        short: 'journal-first-track-s2',
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
        short: 'journal-first-track-s3',
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
  },
  {
    name: 'Workshops',
    location: [locations.estepa, locations.ecija, locations.lebrija, locations.prado, locations.utrera, locations.triana],
    date: 'Monday, Sept 1st, 2025',
    tables: [
      // AI4BPM — 9th International Workshop on Artificial Intelligence for Business Process Management (ESTEPA HALL)
      {
        header: `[AI4BPM - 9th International Workshop on Artificial Intelligence for Business Process Management](${ai4bpmUrl})`,
        title: 'AI4BPM — Session 1 (ESTEPA HALL)',
        short: 'ai4bpm-s1',
        rows: [
          { Time: '09:00 - 09:10', Title: 'Welcome' },
          {
            Time: '09:10 - 10:00',
            Title: 'Keynote: AI-Augmented Business Process Management Systems',
            Authors: 'Marlon Dumas'
          },
          {
            Time: '10:00 - 10:30',
            Title: 'Revealing Trace Variant Shift via Multi-Dimensional Profiling and Community-Aware Graph Modeling',
            Authors: 'Iuliana Malina Grigore, Gabriel Marques Tavares, Vincenzo Pasquadibisceglie and Sylvio Barbon Junior'
          }
        ]
      },
      {
        title: 'AI4BPM — Session 2 (ESTEPA HALL)',
        short: 'ai4bpm-s2',
        rows: [
          {
            Time: '11:00 - 11:30',
            Title: 'Inter-Case Informed Business Process Suffix Prediction Integrating Trace and Log Information',
            Authors: 'Xiaomeng He, Johannes De Smedt, Seppe Vanden Broucke and Jochen De Weerdt'
          },
          {
            Time: '11:30 - 12:00',
            Title: 'Predicting File Completion Using Time Series Models: Embracing the Life-Cycle Nature of Software Development',
            Authors: 'Nastasja Stephanie Parschew and Saimir Bala'
          },
          {
            Time: '12:00 - 12:30',
            Title: 'Leveraging Duration Pseudo-Embeddings in Multilevel LSTM and GCN Hypermodels for Outcome-Oriented PBPM',
            Authors: 'Fang Wang, Paolo Ceravolo and Ernesto Damiani'
          }
        ]
      },
      {
        title: 'AI4BPM — Session 3 (ESTEPA HALL)',
        short: 'ai4bpm-s3',
        rows: [
          {
            Time: '14:00 - 14:30',
            Title: 'Exploring Decision Mining Research: A Systematic Review Report and Knowledge Graph',
            Authors: 'Erfan Elhami, William Van Woensel and Daniel Amyot'
          },
          {
            Time: '14:30 - 15:00',
            Title: 'What is the Best Process Model Representation? A Comparative Analysis for Process Modeling with Large Language Models',
            Authors: 'Alexis Brissard, Frédéric Cuppens and Amal Zouaq'
          },
          {
            Time: '15:00 - 15:30',
            Title: 'Discovering Coordinated Processes From Social Online Networks',
            Authors: 'Anna Kalenkova, Lewis Mitchell and Ethan Johnson'
          }
        ]
      },

      // AUTOMATE — 1st International Workshop on Implementation and Management of Intelligent Process Automation Solutions (ECIJA HALL)
      {
        header: `[AUTOMATE - 1st International Workshop on Implementation and Management of Intelligent Process Automation Solutions](${automateUrl})`,
        title: 'AUTOMATE — Session 1 (ECIJA HALL)',
        short: 'automate-s1',
        rows: [
          { Time: '09:00 - 09:10', Title: 'Welcome' },
          {
            Time: '09:10 - 09:35',
            Title: 'Levels of Automation Revisited: Standardizing Human-Machine Interaction with Process Patterns',
            Authors: 'Christian Janiesch and Seyyid A. Ciftci'
          },
          {
            Time: '09:35 - 10:00',
            Title: 'Structured evaluation of Robotic Process Automation (RPA) tools',
            Authors: 'Romina Giaccio, Emilio Gerolami, Daniel Calegari and Andrea Delgado'
          },
          {
            Time: '10:00 - 10:25',
            Title: 'Runtime-Recovery Agent: Solving UI-related exceptions in RPA Systems with GUI agents',
            Authors: 'Antonio Rodríguez Ruiz, José González Enríquez and Andrés Jiménez Ramírez'
          }
        ]
      },
      {
        title: 'AUTOMATE — Session 2 (ECIJA HALL)',
        short: 'automate-s2',
        rows: [
          {
            Time: '11:00 - 11:25',
            Title: 'From Chaos to Automation: Enabling the Use of Unstructured Data for Robotic Process Automation',
            Authors: 'Kelly Kurowski, Xixi Lu and Hajo A. Reijers'
          },
          {
            Time: '11:25 - 11:45',
            Title: 'Process Automation and Skills in the Context of Knowledge Work (Short Paper)',
            Authors: 'Dries Jarijch, Mieke Jans and Jan Mendling'
          },
          {
            Time: '11:45 - 12:10',
            Title: 'Towards an Actionable Development Method for Robotic Process Automation using Process Mining',
            Authors: 'Alexander Skolik'
          },
          {
            Time: '12:10 - 12:15',
            Title: 'Enabling Sustainable Low-Code Development Through Structured Reuse: Designing a Low-Code Reuse Model',
            Authors: 'Marlon Kampmann, Peter A. François and André Coners'
          },
          {
            Time: '12:15 - 12:20',
            Title: 'Is LLM Agent the New RPA? A Comparative Study with RPA Across Enterprise Workflows',
            Authors: 'Petr Průcha, Michaela Matoušková and Jan Strnad'
          }
        ]
      },
      {
        title: 'AUTOMATE — Session 3 (ECIJA HALL)',
        short: 'automate-s3',
        rows: [
          { Time: '14:00 - 15:30', Title: 'Collaboratively develop a manifesto' }
        ]
      },

      // BP-Meet-IoT — 9th International Workshop on Business Processes Meet the Internet-of-Things (LEBRIJA HALL)
      {
        header: `[BP-Meet-IoT - 9th International Workshop on Business Processes Meet the Internet-of-Things](${bpMeetIotUrl})`,
        short: 'bpmeetiot-s1',
        title: 'BP-Meet-IoT — Session 1 (LEBRIJA HALL)',
        rows: [
          { Time: '09:30', Title: 'Welcome' },
          {
            Time: '09:30 - 10:30',
            Title: 'Keynote: BP-Meet-IoT — a look back at the past and into the future',
            Authors: 'Workshop Chairs'
          }
        ]
      },
      {
        title: 'BP-Meet-IoT — Session 2 (LEBRIJA HALL)',
        short: 'bpmeetiot-s2',
        rows: [
          {
            Time: '11:00 - 11:30',
            Title: 'The PM-EdgeMap: Towards Real-Time Process Mining on the Edge-Cloud Continuum',
            Authors: 'Hendrik Reiter, Christian Imenkamp, Wilhelm Hasselbring, Andrea Maldonado, Olaf Landsiedel and Patrick Rathje'
          },
          {
            Time: '11:30 - 12:00',
            Title: 'IoT Miner – Intelligent Extraction of Event Logs from Sensor Data for Process Mining',
            Authors: 'Edyta Brzychczy, Urszula Jessen, Krzysztof Kluza, Sridhar Sriram and Manuel Vargas Nettelnstroth'
          },
          {
            Time: '12:00 - 12:30',
            Title: 'Incorporating IoT Contexts into Business Processes: A Contextual Classification',
            Authors: 'Jia Wei, Chun Ouyang and Yannis Bertrand'
          }
        ]
      },

      // ProDy — 5th Workshop on Change, Drift, and Dynamics of Organizational Processes (UTRERA HALL)
      {
        header: `[ProDy — 5th Workshop on Change, Drift, and Dynamics of Organizational Processes](${prodyUrl})`,
        title: 'ProDy — Session 1 (UTRERA HALL)',
        short: 'prody-s1',
        rows: [
          {
            Time: '09:00 - 09:30',
            Title: 'A General Framework for Neuro-Symbolic Predictive Process Monitoring',
            Authors: 'Jamila Oukharijane, Ivan Donadello and Fabrizio Maria Maggi'
          },
          {
            Time: '09:30 - 10:00',
            Title: 'Understanding the Dynamics of a Process Mining Project — Analyzing Log Data of a Process Mining Platform',
            Authors: 'Alexander Skolik and Bernd Löhr'
          },
          {
            Time: '10:00 - 10:30',
            Title: 'Linking Actor Behavior to Process Performance Over Time',
            Authors: 'Aurélie Leribaux, Rafael Oyamada, Johannes De Smedt, Zahra Dasht Bozorgi, Artem Polyvyanyy and Jochen De Weerdt'
          }
        ]
      },
      {
        title: 'ProDy — Session 2 (UTRERA HALL)',
        short: 'prody-s2',
        rows: [
          {
            Time: '11:00 - 11:30',
            Title: 'Resource-Oriented Workaround Analysis: A Case Study',
            Authors: 'Wouter van der Waal and Hajo A. Reijers'
          },
          { Time: '11:30 - 12:30', Title: 'Panel discussion' }
        ]
      },

      // DLT4BPM — 1st Workshop on Distributed Ledger Technologies in BPM (UTRERA HALL)
      {
        header: `[DLT4BPM — 1st Workshop on Distributed Ledger Technologies in BPM](${dlt4bpmUrl})`,
        title: 'DLT4BPM — Session 1 (UTRERA HALL)',
        short: 'dlt4bpm-s1',
        rows: [
          {
            Time: '14:00 - 15:00',
            Title: 'Keynote: Beyond the Hype — Blockchain meets BPM — Challenges on the Plains',
            Authors: 'Julius Köpke (University of Klagenfurt, Austria)'
          },
          {
            Time: '15:00 - 15:30',
            Title: 'Paper Presentation: On LLM-Assisted Generation of Smart Contracts from Business Processes',
            Authors: 'Fabian Stiehle, Hans Weytjens and Ingo Weber'
          }
        ]
      },
      {
        title: 'DLT4BPM — Session 2 (UTRERA HALL)',
        short: 'dlt4bpm-s2',
        rows: [
          {
            Time: '16:00 - 16:30',
            Title: 'Paper Presentation: Gas Management Patterns in Blockchain-enabled Process Execution',
            Authors: 'Hassan Atwi and Cesare Pautasso'
          },
          {
            Time: '16:30 - 16:45',
            Title: 'Lightning Talk: A Methodology for Extracting and Decoding Smart Contracts Data',
            Authors: 'Flavio Corradini, Alessandro Marcelletti, Andrea Morichetta and Barbara Re'
          },
          {
            Time: '16:45 - 17:00',
            Title: 'Lightning Talk: Compliance Checking For Decentralized Applications',
            Authors: 'Flavio Corradini, Alessio Galassi, Alessandro Marcelletti and Barbara Re'
          }
        ]
      },
      // FM-BPM — 3rd International Workshop on Formal Methods for BPM (ECIJA HALL)
      {
        header: `[FM-BPM — 3rd International Workshop on Formal Methods for BPM](${fmbpmUrl})`,
        title: 'FM-BPM — Plenary (ECIJA HALL)',
        short: 'fmbpm-s1',
        rows: [
          { Time: '16:00 - 16:10', Title: 'Opening and introduction to discussion topics' },
          { Time: '16:10 - 16:40', Title: 'Discussions in the base groups' },
          { Time: '16:40 - 17:10', Title: 'Presentations of the key findings per topic (panels)' },
          { Time: '17:10 - 17:30', Title: 'Final discussion and closing' }
        ]
      },
      // Innov8BPM — 2nd International Workshop on Managing Process Innovation in the Era of Digital Transformation (LEBRIJA HALL)
      {
        header: `[Innov8BPM — 2nd International Workshop on Managing Process Innovation in the Era of Digital Transformation](${innov8bpmUrl})`,
        title: 'Innov8BPM — Session 1 (LEBRIJA HALL)',
        short: 'innov8bpm-s1',
        rows: [
          { Time: '14:00 - 14:10', Title: 'Opening by workshop chairs' },
          {
            Time: '14:10 - 15:10',
            Title: 'Keynote: The BPM Sandwich Model — Balancing Emergence and Control in Times of Continuous Change',
            Authors: 'Jan vom Brocke'
          },
          {
            Time: '15:10 - 15:30',
            Title: 'The Increasing Importance of Knowledge with the Growth of BPM Maturity',
            Authors: 'Szelągowski et al.'
          }
        ]
      },
      {
        title: 'Innov8BPM — Session 2 (LEBRIJA HALL)',
        short: 'innov8bpm-s2',
        rows: [
          {
            Time: '16:00 - 16:20',
            Title: 'Factors and Impacts of Gender Imbalance in Digital Transformation Projects: A Systematic Literature Review',
            Authors: 'Syahputra et al.'
          },
          {
            Time: '16:20 - 16:40',
            Title: 'Modeling business processes: from a BPMN structured process flow to a declarative rule-based ACM method',
            Authors: 'Fernandes et al.'
          },
          {
            Time: '16:40 - 17:00',
            Title: 'Connecting the Digital Dots — Can Customer Journeys be Analyzed Purely from Event Logs?',
            Authors: 'Brekke et al.'
          },
          { Time: '17:00 - 17:30', Title: 'Wrap up and interactive session' }
        ]
      },
      // NLP4BPM — 4th Workshop on Natural Language Processing for BPM (PRADO HALL)
      {
        header: `[NLP4BPM — 4th Workshop on Natural Language Processing for BPM](${nlp4bpmUrl})`,
        title: 'NLP4BPM — Session 1 (PRADO HALL, Chair: Jana Rehse)',
        short: 'nlp4bpm-s1',
        rows: [
          {
            Time: '14:00 - 14:40',
            Title: 'Keynote: LLMs for BPM — From First-Wave Features to Process Understanding and Lasting Impact',
            Authors: 'Adrian Rebmann (SAP Signavio)'
          },
          {
            Time: '14:40 - 15:05',
            Title: 'Natural Language Processing for BPMN Model Generation with LLMs — A Systematic Literature Review',
            Authors: 'Alena Wimmer, Ana Costa and Luise Pufahl'
          },
          {
            Time: '15:05 - 15:30',
            Title: 'An LLM Pipeline for Automatic Extraction and Evaluation of Care Pathways from Clinical Guidelines',
            Authors: 'Alireza Houshidari, William Van Woensel, Daniel Amyot and El Mostafa Bouattane'
          }
        ]
      },
      {
        title: 'NLP4BPM — Session 2 (PRADO HALL, Chair: Henrik Leopold)',
        short: 'nlp4bpm-s2',
        rows: [
          {
            Time: '16:00 - 16:25',
            Title: 'Large Language Models for Business Process Management — A Practice Overview',
            Authors: 'Cielo Gonzalez Moyano, Rachmadita Andre Swari, Kristina Sahling, Jennifer Haase, Kate Revoredo and Jan Mendling'
          },
          {
            Time: '16:25 - 16:50',
            Title: 'Configuring Large Reasoning Models using Process Mining — A Benchmark and a Case Study',
            Authors: 'Alessandro Berti, Humam Kourani, Gyunam Park and Wil M.P. van der Aalst'
          },
          {
            Time: '16:50 - 17:30',
            Title: 'Roundtable Discussion: Envisioning the Next Frontier for NLP in BPM',
            Authors: 'Participants: Adrian Rebmann, Alessandro Berti; Participation open to all'
          }
        ]
      },
      // OBJECTS — 3rd Workshop on Object-centric processes from A to Z (TRIANA HALL & ESTEPA HALL)
      {
        header: `[OBJECTS — 3rd Workshop on Object-centric processes from A to Z](${objectsUrl})`,
        title: 'OBJECTS — Session 1: Paper presentations (TRIANA HALL)',
        short: 'objects-s1',
        rows: [
          {
            Time: '09:00 - 09:30',
            Title: 'Transforming Football Data into Object-centric Event Logs with Spatial Context Information',
            Authors: 'Man Tuen Chan, Lennart Ebert, Paul-Julius Hillmann, Christoffer Rubensson, Stephan Fahrenkrog-Petersen and Jan Mendling'
          },
          {
            Time: '09:30 - 10:00',
            Title: 'An Object-Centric Approach to Inferring and Analyzing Queues',
            Authors: 'Sander van Gansewinkel, Vadim Denisov and Dirk Fahland'
          },
          {
            Time: '10:00 - 10:30',
            Title: 'Object-based Process Model Generation',
            Authors: 'Selina Schueler and Sascha Alpers'
          }
        ]
      },
      {
        title: 'OBJECTS — Session 2: Public review session (TRIANA HALL)',
        short: 'objects-s2',
        rows: [
          {
            Time: '11:00 - 11:30',
            Title: 'Public review session: Object-centric framework for addressing the challenges in OC-BPM and OCPM',
            Authors: 'Anjo Seidel (HPI)'
          },
          {
            Time: '11:30 - 12:00',
            Title: 'Presentation of the challenges identified at BuzzOs 2024'
          },
          { Time: '12:00 - 12:30', Title: 'Panel discussion' }
        ]
      },
      {
        title: 'OBJECTS — Session 3: BuzzOs working group (ESTEPA HALL, by invitation only)',
        short: 'objects-s3',
        rows: [
          { Time: '16:00 - 17:30', Title: 'BuzzOs working group session (by invitation only)' }
        ]
      },
      // PLC — 2nd International Workshop on Processes, Laws, and Compliance (TRIANA HALL)
      {
        header: `[PLC — 2nd International Workshop on Processes, Laws, and Compliance](${plcUrl})`,
        title: 'PLC — Session 1 (TRIANA HALL, Chair: Laura Genga)',
        short: 'plc-s1',
        rows: [
          { Time: '14:00', Title: 'Opening' },
          {
            Time: '14:15 - 15:00',
            Title: 'Keynote: Towards Holistic Business Process Compliance: Leveraging Logs, Models and Textual Data',
            Authors: 'Karolin Winter (Eindhoven University of Technology)'
          },
          { Time: '15:00 - 15:30', Title: 'Question & Answers' }
        ]
      },
      {
        title: 'PLC — Session 2 (TRIANA HALL, Chair: Roberto Nai)',
        short: 'plc-s2',
        rows: [
          {
            Time: '16:00 - 16:20',
            Title: 'From Text to Process: Leveraging LLMs to Unveil Italian Lawmaking',
            Authors: 'Matilde Contestabile, Chiara Ferrara, Alberto Giovannetti, Giovanni Parrillo and Andrea Vandin'
          },
          {
            Time: '16:20 - 16:40',
            Title: 'Understanding Feature Contributions to Remaining Time Prediction in Judicial Processes',
            Authors: 'Musa Salamov, Marlon Dumas and Barbara Pernici'
          },
          { Time: '16:45 - 17:30', Title: 'Interactive Session — White Paper on Processes, Law and Compliance' }
        ]
      },
      // VIPRA — 2nd Workshop on Visual Process Analytics (PRADO HALL)
      {
        header: `[VIPRA — 2nd Workshop on Visual Process Analytics](${vipraUrl})`,
        title: 'VIPRA — Session 1 (PRADO HALL)',
        short: 'vipra-s1',
        rows: [
          {
            Time: '09:00 - 09:40',
            Title: 'Keynote: What BPM Researchers Should Know About Visual Analytics',
            Authors: 'Maria-Cruz Villa Uriol (University of Sheffield)'
          },
          {
            Time: '09:40 - 10:05',
            Title: 'Milana — Bridging process mining and visual analytics through task classification',
            Authors: 'Lisa Zimmermann, Katerina Vrotsou, Pnina Soffer, Philipp Koytek, Barbara Weber and Shazia Sadiq'
          },
          {
            Time: '10:05 - 10:30',
            Title: 'VESPA — Visual Event-Stream Progressive Analytics',
            Authors: 'Andrea Burattin, Silvia Miksch, Shazia Sadiq, Hans-Jörg Schulz and Katerina Vrotsou'
          }
        ]
      },
      {
        title: 'VIPRA — Session 2 (PRADO HALL)',
        short: 'vipra-s2',
        rows: [
          {
            Time: '11:00 - 11:25',
            Title: 'Addressing Directly-Follows Graphs limitations with visualization of event sequences',
            Authors: 'Luis Montana, Manuel Resinas and Maria-Cruz Villa-Uriol'
          },
          {
            Time: '11:25 - 11:50',
            Title: 'Visualizing Object-Centric Petri Nets',
            Authors: 'Tobias Brachmann, István Koren, Lukas Liß and Wil M. P. van der Aalst'
          },
          {
            Time: '11:50 - 12:30',
            Title: 'Panel Discussion: The Present and Future of VA & BPM',
            Authors: 'Participants: Presenters; Audience participation welcome'
          }
        ]
      }
    ]
  }
];

import type { ImageMetadata } from 'astro';
import Mendling from '@/assets/images/people/mendling.jpg';
import Dumas from '@/assets/images/people/dumas.jpeg';
import Gal from '@/assets/images/people/gal.jpg';
import Ghidini from '@/assets/images/people/ghidini.jpg';
import Reichert from '@/assets/images/people/reichert.jpg';
import Reijers from '@/assets/images/people/reijers.jpg';
import RinderleMa from '@/assets/images/people/rinderle-ma.jpeg';
import Adela from '@/assets/images/people/ortega.jpg';
import Rosemann from '@/assets/images/people/rosemann.jpg';
import Sadiq from '@/assets/images/people/sadiq.jpg';
import Weber from '@/assets/images/people/weber.jpg';
import Weidlich from '@/assets/images/people/weidlich.jpg';
import Weske from '@/assets/images/people/weske.jpg';

interface CommitteeMember {
  treatment?: string;
  job?: string;
  image?: ImageMetadata;
  institution?: string;
  location?: string;
  email?: string;
}

const treatment = 'Prof. Dr.';
const USData = {
  institution: 'University of Seville',
  location: 'Seville, Spain'
};

export const steeringCommittee: Record<string, CommitteeMember> = {
  'Jan Mendling': {
    treatment,
    job: 'Chair',
    image: Mendling,
    institution: 'Humboldt University Berlin',
    location: 'Berlin, Germany',
    email: 'jan.mendling@hu-berlin.de'
  },
  'Marlon Dumas': {
    treatment,
    job: 'Vice-Chair 2017 - 2022',
    image: Dumas,
    institution: 'University of Tartu',
    location: 'Tartu, Estonia',
    email: 'marlon.dumas@ut.ee'
  },
  'Avigador Gal': {
    treatment,
    image: Gal,
    institution: 'Technion - Israel Institute of Technology',
    location: 'Haifa, Israel',
    email: 'avigal@technion.ac.il'
  },
  'Chiara Ghidini': {
    treatment,
    image: Ghidini,
    institution: 'Fondazione Bruno Kessler',
    location: 'Trento, Italy',
    email: 'ghidini@fbk.eu'
  },
  'Manfred Reichert': {
    treatment,
    image: Reichert,
    institution: 'University of Ulm',
    location: 'Ulm, Germany',
    email: 'manfred.reichert@uni-ulm.de'
  },
  'Hajo Reijers': {
    treatment: 'Prof. Dr. ir.',
    image: Reijers,
    institution: 'University of Utrecht',
    location: 'Utrecht, The Netherlands',
    email: 'h.a.reijers@uu.nl'
  },
  'Stefanie Rinderle-Ma': {
    treatment,
    job: 'Vice-Chair',
    image: RinderleMa,
    institution: 'Technical University of Munich',
    location: 'Munich, Germany',
    email: 'stefanie.rinderle-ma@tum.de'
  },
  'Adela del Río Ortega': {
    treatment,
    image: Adela,
    ...USData,
    email: 'adeladelrio@us.es'
  },
  'Michael Rosemann': {
    treatment,
    image: Rosemann,
    institution: 'Queensland University of Technology',
    location: 'Brisbane, Australia',
    email: 'm.rosemann@qut.edu.au'
  },
  'Shazia Sadiq': {
    treatment,
    image: Sadiq,
    institution: 'University of Queensland',
    location: 'Brisbane, Australia',
    email: 'shazia@itee.uq.edu.au'
  },
  'Barbara Weber': {
    treatment,
    image: Weber,
    institution: 'University of St. Gallen',
    location: 'St. Gallen, Switzerland',
    email: 'barbara.weber@unisg.ch'
  },
  'Matthias Weidlich': {
    treatment,
    image: Weidlich,
    institution: 'Humboldt University Berlin',
    location: 'Berlin, Germany',
    email: 'matthias.weidlich@hu-berlin.de'
  },
  'Mathias Weske':
  {
    treatment,
    job: 'Chair 2017 - 2022',
    image: Weske,
    institution: 'HPI, University of Potsdam',
    location: 'Potsdam, Germany',
    email: 'mathias.weske@hpi.de'
  }
};

export const conferenceChairs: Record<string, Record<string, CommitteeMember>> = {
  'General chairs': {
    'Adela del Río Ortega': steeringCommittee['Adela del Río Ortega'] ?? {},
    'Manuel Resinas': {
      ...USData,
      email: 'resinas@us.es'
    }
  },
  'Program Committee': {
    'Arik Senderovich': {},
    'Cristina Cabanillas': {
      ...USData,
      email: 'cristinacabanillas@us.es'
    },
    'Irene Vanderfeesten': {},
    'Hajo Reijers': steeringCommittee['Hajo Reijers'] ?? {}
  },
  'Workshops': {
    'Han van der Aa': {},
    'Bedilia Estrada Torres': {
      ...USData,
      email: 'iestrada@us.es'
    },
    'Inge van der Weerd': {}
  },
  'Demos & Resources': {
    'Francesca Zerbato': {},
    'Iris Beerepoot': {},
    'Alfonso Márquez Chamorro': {
      ...USData,
      email: 'amarquez6@us.es'
    }
  },
  'Industry Forum': {
    'Hugo A. López': {},
    'Andrés Jiménez-Ramírez': {},
    'Estefanía Serral': {}
  },
  'Education Forum': {
    'Kate Revoredo': {},
    'Banu Aysolmaz': {},
    'Wasana Bandara': {}
  },
  'Tutorial & Panel': {
    'Marco Comuzzi': {},
    'Vicky Torres': {},
    'Jorge Muñoz Gama': {}
  },
  'Doctoral Consortium': {
    'Flavia Santoro': {},
    'Benoit Depaire': {},
    'Jana Rehse': {}
  },
  'Journal First Track': {
    'Niels Martin': {},
    'Karolin Winter': {}
  }
};

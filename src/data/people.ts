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
import BanuAysolmaz from '@/assets/images/people/banu_aysolmaz.jpg';
import HanVanDerAa from '@/assets/images/people/han_van_der_aa.jpg';
import JanaRehse from '@/assets/images/people/jana_rehse.jpg';
import KarolinWinter from '@/assets/images/people/karolin_winter.jpg';
import NielsMartin from '@/assets/images/people/niels_martin.jpg';

interface CommitteeMember {
  treatment?: string;
  job?: string;
  image?: ImageMetadata;
  institution?: string;
  location?: string;
  email?: string;
  bio?: string;
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
    'Han van der Aa': {
      email: 'han.van.der.aa@univie.ac.at',
      institution: 'University of Vienna',
      location: 'Vienna, Austria',
      image: HanVanDerAa,
      bio: `
        Han van der Aa is a full professor of Process-Oriented Information Systems at the Faculty of
        Computer Science of the University of Vienna. Before that, he was a junior professor at the
        University of Mannheim and an Alexander von Humboldt Fellow at the Humboldt-Universität zu Berlin.
        He holds a PhD from the Vrije Universiteit Amsterdam, obtained in 2018. His research focuses on
        process mining and analysis, with emphasis on the considerations of natural language, uncertainty, and privacy.
        His research has been published in premier conferences (BPM, CAISE, ICPM, ICDE, SIGMOD) and journals (IS, TKDE, TSE, DSS).
      `
    },
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
    'Banu Aysolmaz': {
      location: 'Eindhoven, The Netherlands',
      image: BanuAysolmaz,
      institution: 'Eindhoven University of Technology',
      email: 'b.e.aysolmaz@tue.nl',
      bio: `
        Banu Aysolmaz is an assistant professor in the Information Systems group of Eindhoven University of Technology (TU/e).
        Her research interests centre around explorative BPM, specifically on the use of emerging digital technologies,
        such as data analytics and artificial intelligence in processes. She investigates process innovation
        in relation to business models and organizational capabilities. She particularly focuses on digital transformation
        for circularity and sustainability. She received her PhD in information systems and received a Marie Curie fellowship
        for postdoctoral research. She has substantial industrial experience as a software developer
        and project manager and has led various projects as a BPM and process improvement consultant.
        She has designed and delivered BPM courses in various universities and for professionals.
      `
    },
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
    'Jana-Rebecca Rehse': {
      email: 'rehse@uni-mannheim.de',
      institution: 'University of Mannheim',
      location: 'Mannheim, Germany',
      image: JanaRehse,
      bio: `
        Jana-Rebecca Rehse is Junior Professor for Management Analytics at the University of Mannheim,
        where she leads a research group on data-driven business process management by means of process mining
        and machine learning. She is particularly interested in developing process mining methods that deliver
        direct (business) value and are applicable by non-expert users. Before coming to Mannheim,
        Jana was a researcher and project lead at the German Research Center for Artificial Intelligence (DFKI)
        and a visiting research scholar at Stevens Institute of Technology in Hoboken, NJ.
        She obtained her PhD from Saarland University in 2019.
      `
    }
  },
  'Journal First Track': {
    'Niels Martin': {
      email: 'niels.martin@uhasselt.be',
      institution: 'Universiteit Hasselt',
      location: 'Hasselt, Belgium',
      image: NielsMartin,
      bio: `
        Niels Martin is an Assistant Professor in the research group Business Informatics at Hasselt University (Belgium).
        He is currently leading the research cell Process Analytics in Healthcare,
        focusing on topics such as work organisation mining, human resource mining, data-driven process simulation,
        care pathway analytics and process data quality. His research has been published in highly-regarded journals
        such as Information & Management, IEEE Transactions on Services Computing, Artificial Intelligence in Medicine,
        Decision Support Systems and Business & Information Systems Engineering.
        As an active community member, he is a steering committee member of the Process-Oriented Data Science
        for Healthcare Alliance, and a member of the IEEE Task Force on Process Mining
        and the Scientific Research Community on Process Mining.
      `
    },
    'Karolin Winter': {
      email: 'k.m.winter@tue.nl',
      institution: 'Eindhoven University of Technology',
      location: 'Eindhoven, The Netherlands',
      image: KarolinWinter,
      bio: `
        Karolin Winter is an Assistant Professor in Information Systems at Eindhoven University of Technology.
        Her main research interests are located in the area of business process compliance and process mining
        with a particular focus on applying, enhancing and developing process and data mining as well
        as natural language processing techniques. She contributed, e.g., to the formalization of
        instance spanning constraints and their discovery from process execution logs as well as
        to the direct compliance assessment between regulatory documents and processes.
        She received the runner-up best dissertation award at the BPM conference in 2021 and served
        as reviewer and PC member for conferences like BPM, ICPM and CoopIS.
      `
    }
  }
};

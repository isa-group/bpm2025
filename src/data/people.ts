import type { ImageMetadata } from 'astro';
import AlfonsoMarquez from '@/assets/images/people/AlfonsoMarquez.jpeg';
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
import BediliaEstrada from '@/assets/images/people/BEstradaTorres.png';
import BenoitDepaire from '@/assets/images/people/BenoitDepaire.jpg';
import IngeVanDerWeed from '@/assets/images/people/IngeVanDerWeerd.jpg';
import KateRevoredo from '@/assets/images/people/KateRevoredo.jpg';
import MarcoComuzzi from '@/assets/images/people/marco-comuzzi.jpg';
import JorgeMunozGama from '@/assets/images/people/Jorge_Munoz_Gama.jpg';
import VictoriaTorres from '@/assets/images/people/vicky-torres.jpg';
import EstefaniaSerral from '@/assets/images/people/Estefania_Serral.jpg';
import FlaviaSantoro from '@/assets/images/people/flavia_santoro.png';
import FrancescaZerbato from '@/assets/images/people/francesca_zerbato.jpg';
import IrisBeerepoot from '@/assets/images/people/iris_beerepoot.jpg';
import WasanaBandara from '@/assets/images/people/wasana_bandara.jpg';
import AndresJimenezRamirez from '@/assets/images/people/andres_jimenez_ramirez.jpg';
import DanielCalegari from '@/assets/images/people/daniel_calegari.jpeg';
import OrlenysLopezPintado from '@/assets/images/people/orlenys_lopez_pintado.jpg';
import SimoneAgostinelli from '@/assets/images/people/simone_agostinelli.jpg';
import ManuelResinas from '@/assets/images/people/resinas.jpg';
import HugoALopez from '@/assets/images/people/hugo_a_lopez.jpg';
import RehanSyed from '@/assets/images/people/rehan_syed.jpg';
import CristinaCabanillas from '@/assets/images/people/Cristina_Cabanillas.png';
import ArikSenderovich from '@/assets/images/people/arik_senderovich.jpg';
import VanDerAalst from '@/assets/images/people/vanderaalst.jpg';
import ThomasGrisold from '@/assets/images/people/ThomasGrisold.png';
import Mahendra from '@/assets/images/people/Mahendra.jpg';
import JohannesSmedt from '@/assets/images/people/JohannesSmedt.jpg';
import IreneVanderfeesten from '@/assets/images/people/IreneVanderfeesten.jpg';

interface ConferenceMember {
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

const sharedPeopleData = {
  'Hajo Reijers': {
    treatment: 'Prof. Dr. ir.',
    job: 'Consolidation chair',
    image: Reijers,
    institution: 'Utrecht Univerity',
    location: 'Utrecht, The Netherlands',
    email: 'h.a.reijers@uu.nl',
    bio: `
      Hajo Reijers is a full professor at Utrecht University, leading the Process Science group in the
      Department of Information and Computing Sciences, and holds additional professorships at
      Eindhoven University of Technology and Queensland University of Technology. Formerly a consultant at
      Deloitte and Accenture, he has also led the BPM research group at Lexmark, served as a professor at
      Vrije Universiteit Amsterdam and advised multiple high-tech start-ups. His research focuses on
      business process redesign, automation, conceptual modeling, and enterprise information systems,
      with over 300 academic publications. See his website (www.reijers.com) for more info or follow his musings on X via @profBPM.
    `
  },
  'Adela del Río Ortega': {
    treatment,
    image: Adela,
    ...USData,
    email: 'adeladelrio@us.es',
    bio: `
      Adela del Río Ortega is a professor at Universidad de Sevilla and a member of the ISA Research group,
      where she initiated the Business Process Management research line with her PhD thesis.
      She serves on the Steering Committee of the BPM conference and is known for her work on process performance indicators (PPIs)
      and their automatic analysis. Her current research interests include process performance management,
      RPA and personal productivity analytics. With over 50 publications in top computer science and information systems outlets,
      she has developed two registered software tools valued at over €60k and participated in more than 10 externally funded projects.
      She has also collaborated with various IT companies as a consultant and researcher.
    `
  },
  'Avigdor Gal': {
    treatment,
    image: Gal,
    institution: 'Technion - Israel Institute of Technology',
    location: 'Haifa, Israel',
    email: 'avigal@technion.ac.il',
    bio: `
      Avigdor Gal is the Benjamin and Florence Free Chaired Professor of Data Science and
      the Co-chair of the Center for Humanities & AI at the Technion - Israel Institute of Technology.
      He is with the Faculty of Data & Decision Sciences, where he led the design of the first
      engineering program in data science in Israel (and possibly the world). Gal’s research
      focuses on elements of data integration and process management and mining under uncertainty,
      making use of state-of-the-art machine learning and deep learning techniques to offer an improved
      data quality with about 150 publications in leading journals, books, and conference proceedings
      (including multiple best paper and test-of-time awards). His research is implemented,
      through his ties as a consultant, in multiple industries including FinTech (e.g., Pagaya).
      In recent years, with the increasing penetration of AI to all aspects of life,
      Gal has been involved in developing methods for embedding responsible AI in companies and
      government authorities through an education process that increases dialogue abilities between data
      scientists and other stake-holders (e.g., lawyers and regulators).
    `
  },
  'Flavia Santoro': {
    image: FlaviaSantoro,
    email: 'flaviamariasantoro@gmail.com',
    institution: 'Institute of Technology and Leadership (Inteli)',
    location: 'Rio de Janeiro, Brazil',
    bio: `
      Flavia Santoro is the Academic Dean of the Institute of Technology and Leadership (Inteli),
      and she is a professor at the University of the State of Rio de Janeiro. She earned her Ph.D. in
      Systems and Computer Engineering from the Federal University of Rio de Janeiro (UFRJ), alongside a
      Bachelor's degree in Electronic Engineering from the UFRJ's Polytechnic School,
      and a Master's degree in Contemporary Philosophy from the Pontifical Catholic University of Rio de Janeiro.
      Since 2009, she has been a recipient of the prestigious National Council of
      Technological and Scientific Development (CNPq) Fellowship.
      Her academic journey also includes sabbaticals at the Université Pierre et Marie Curie - Paris VI, France,
      during 2004-2005, and at Queensland University of Technology, Australia,
      from 2012 to 2013. With over two decades of experience as an educator and researcher in the field of
      Information Systems, Santoro's work primarily focuses on Business Process Management,
      Knowledge-intensive Processes, Knowledge Management, and Computer Supported Cooperative Work and Learning.
      Beyond academia, she has lent her expertise as a consultant on numerous projects related to BPM and
      software development for various companies.
    `
  },
  'Iris Beerepoot': {
    image: IrisBeerepoot,
    email: 'i.m.beerepoot@uu.nl',
    treatment: 'Dr.',
    institution: 'University of Utrecht',
    location: 'Utrecht, The Netherlands',
    bio: `
      Iris Beerepoot is an Assistant Professor in the Process Science group at the
      Department of Information & Computing Sciences at Utrecht University.
      Her research focuses on work processes in organisations and the extent to which
      this work is supported by and recorded in information systems. In her Ph.D. thesis,
      she studied the use of workarounds in healthcare organisations and analysed them with a mix of methods,
      including process mining. Her work has been published in the proceedings of leading conferences
      such as BPM, ICPM, ICIS, and ECIS, as well as in journals such as Computers in
      Industry, Business & Information Systems Engineering, Information Technology and Management,
      and the Journal of Biomedical Informatics. She served on several organising and program committees
      at BPM and ICPM, was awarded the BPM runner-up best dissertation award, and won an outstanding reviewer
      award at ECIS for two consecutive years. She chairs the AI Lab for Public Services
      which currently houses ten Ph.D. students. As a guest researcher, she visited
      the University of Haifa, the Sapienza University of Rome, the University of Seville, and the University of Queensland.
    `
  }
} satisfies Record<string, ConferenceMember>;

/**
 * This type also ensures that IntelliSense is provided for the shared people's keys.
 */
type ConferenceMemberData = Partial<Record<keyof typeof sharedPeopleData, ConferenceMember>> & Record<string, ConferenceMember>;

export const steeringCommittee: Record<string, ConferenceMemberData> = {
  'Steering Committee': {
    'Jan Mendling': {
      treatment,
      job: 'Chair',
      image: Mendling,
      institution: 'Humboldt University Berlin',
      location: 'Berlin, Germany',
      email: 'jan.mendling@hu-berlin.de'
    },
    'Avigdor Gal': sharedPeopleData['Avigdor Gal'],
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
    'Hajo Reijers': sharedPeopleData['Hajo Reijers'],
    'Stefanie Rinderle-Ma': {
      treatment,
      job: 'Vice-Chair',
      image: RinderleMa,
      institution: 'Technical University of Munich',
      location: 'Munich, Germany',
      email: 'stefanie.rinderle-ma@tum.de'
    },
    'Adela del Río Ortega': sharedPeopleData['Adela del Río Ortega'],
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
    }
  },
  'Advisory board': {
    'Wil van der Aalst': {
      treatment: 'Prof.dr.ir.',
      job: 'SC Member 2003-2022, SC Chair 2003-2017',
      image: VanDerAalst,
      institution: 'RWTH Aachen',
      location: 'Aachen, Germany',
      email: 'wvdaalst@pads.rwth-aachen.de'
    },
    'Mathias Weske': {
      treatment,
      job: 'Chair 2017 - 2022',
      image: Weske,
      institution: 'HPI, University of Potsdam',
      location: 'Potsdam, Germany',
      email: 'mathias.weske@hpi.de'
    },
    'Marlon Dumas': {
      treatment,
      job: 'Vice-Chair 2017 - 2022',
      image: Dumas,
      institution: 'University of Tartu',
      location: 'Tartu, Estonia',
      email: 'marlon.dumas@ut.ee'
    }
  }
};

export const conferenceChairs: Record<string, ConferenceMemberData> = {
  'General chairs': {
    'Adela del Río Ortega': sharedPeopleData['Adela del Río Ortega'],
    'Manuel Resinas': {
      ...USData,
      image: ManuelResinas,
      email: 'resinas@us.es',
      bio: `
        Manuel Resinas is a Professor at the University of Seville, where he leads the Information Systems 
        group in the Smart Computer Systems Research and Engineering lab. His current research interests 
        include process performance and compliance management, personal productivity analytics, and the 
        process of process mining. Previously, he worked on the analysis and management of service level 
        agreements. His research is regularly published in journals like IEEE Trans. Serv. Comp. or BISE, 
        and conferences like BPM or CAiSE. He has been general chair and PC chair of the BPM conference, 
        and is currently associate editor in the BISE journal.        
      `
    }
  },
  'Program Committee': {
    'Arik Senderovich': {
      image: ArikSenderovich,
      job: 'Track I chair',
      institution: 'School of Information Technologies (ITEC), York University',
      location: 'Toronto, Canada',
      email: 'sariks@yorku.ca',
      bio: `
        Arik Senderovich is an Assistant Professor at the School of Information Technologies (ITEC) at York University in Toronto, Canada.
        He also holds a Status-Only Assistant Professor position at the Rotman School of Management, University of Toronto,
        where he supervises Master of Management Analytics (MMA) student projects, teaches colloquia, and organizes professional events.
        Prior to his current role at ITEC, Arik served as an Assistant Professor at both the Rotman School of Management and
        the Faculty of Information at the University of Toronto.

        Arik is the Chief Technology Officer (CTO) and co-founder of SiMLQ, a process mining company with a vibrant
        R&D center in Toronto. His research lies at the intersection of Operations Management, Data Science, and
        Artificial Intelligence, with a current focus on developing methodologies for automatically learning models
        of complex and congested environments—such as hospitals and public transportation systems—based on data logs.

        Arik’s work has been published in leading conferences including AAAI, BPM, ICAPS, ICPM, and the
        Winter Simulation Conference (WSC). He has also authored numerous papers in top-tier journals such as
        Information Systems and INFORMS Journal on Computing. Additionally, Arik has served as a Guest Editor for
        Information Systems and was the Program Chair for ICPM 2023.
      `
    },
    'Cristina Cabanillas': {
      image: CristinaCabanillas,
      ...USData,
      job: 'Track II chair',
      email: 'cristinacabanillas@us.es',
      bio: `
        Cristina Cabanillas is a Professor at the University of Seville and a member of the Information Systems group in the SCORE lab.
        She worked for seven years at WU Vienna, where she got the Habilitation. She has coordinated three research projects and
        a technology transfer project of competitive Austrian and Spanish calls. Her current research interests include
        resource management in business processes; process mining, with a focus on easing process mining analysis tasks;
        and business process compliance. She has over 70 academic publications and two registered software tools,
        she has chaired a number of tracks and workshops in top international conferences, she has given invited talks in
        international institutions, and she has collaborated with the Spanish public administration, national and
        international companies.
      `
    },
    'Irene Vanderfeesten': {
      image: IreneVanderfeesten,
      job: 'Track III chair',
      email: 'irene.vanderfeesten@kuleuven.be',
      institution: 'KU Leuven',
      location: 'Leuven, Belgium',
      bio: `
        Irene Vanderfeesten is Associate Professor of Business Information Systems at KU Leuven, Belgium.
        She previously held scientific positions with Eindhoven University of Technology and
        Open Universiteit in the Netherlands. Her research concentrates on
        Business Process Management and Digital Transformation, with a specific emphasis on improving
        complex business processes that involve physical components, particularly in fields such as
        manufacturing and healthcare. Her work involves developing methods, tools, and techniques for
        analyzing, redesigning, and automating these business processes. Of particular interest to her
        are the human aspects and sustainability factors in these transformations.
      `
    },
    'Hajo Reijers': sharedPeopleData['Hajo Reijers']
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
      image: BediliaEstrada,
      email: 'iestrada@us.es',
      bio: `
        Bedilia Estrada Torres is an assistant professor at the Department of Languages and Computer Systems
        and a member of the ISA Research Group at the University of Seville, Spain.
        She received her international PhD in Computer Engineering in 2018.
        Her research interests include business process management, the analysis, modeling, and management
        of process performance indicators in different scenarios, such as structured processes,
        variability in process families, knowledge-intensive processes, their relationship with
        decision-making processes, and the use of chatbots in process management. Bedilia collaborated and
        conducted research stays in Brazil and Estonia and has participated in more than ten Spanish and
        European research, development, and innovation projects. She serves as a program committee member
        in business process management conferences and as a peer reviewer in scientific journals.
      `
    },
    'Inge van der Weerd': {
      image: IngeVanDerWeed,
      email: 'g.c.vandeweerd@uu.nl',
      institution: 'Utrecht University',
      location: 'Utrecht, The Netherlands',
      bio: `
        Inge van de Weerd is an Associate Professor in the Process Science group
        at the Department of Information and Computing Sciences of Utrecht University.
        Her research focuses on the intersection of IT and organisations.
        Her research interests include workaround mining, process drift, and robotic process automation.
        She has over 100 publications. Amongst others, her work has been published in the proceedings of the BPM,
        Process Mining, ECIS, and ICIS conferences, and in the journals of Business & Information Systems Engineering,
        Computers in Industry, and Information & Management.
      `
    }
  },
  'Demos & Resources': {
    'Iris Beerepoot': sharedPeopleData['Iris Beerepoot'],
    'Alfonso E. Márquez-Chamorro': {
      ...USData,
      image: AlfonsoMarquez,
      email: 'amarquez6@us.es',
      bio: `
        Alfonso E. Márquez-Chamorro obtained his Ph.D. degree with honours from the Pablo de Olavide University of Sevilla in 2013.
        Currently, he is an Associate Professor at the University of Sevilla, member of the ISA Research Group and SCORE Laboratory.
        His current research interests include business process management, process mining and data science.
        Previously, he worked on bioinformatics and evolutionary computation. He has contributed to more than 40 scientific publications
        in prestigious journals and conferences and took part in more than 15 R&D&I projects.
      `
    },
    'Francesca Zerbato': {
      image: FrancescaZerbato,
      email: 'f.zerbato@tue.nl',
      institution: 'Eindhoven University of Technology',
      location: 'Eindhoven, The Netherlands',
      bio: `
        Francesca Zerbato is an Assistant Professor in the Process Analytics cluster at
        Eindhoven University of Technology, Netherlands. She obtained her PhD in Computer Science
        from the University of Verona in 2019 and conducted her post-doctoral research
        at the University of St. Gallen, Switzerland. Her main research interests are
        in the areas of process mining, with a focus on understanding and supporting users
        in their “process of process mining”. Francesca serves in the program committees of
        the BPM and ICPM conferences and is a co-organizer of the EduPM and ERPM workshops.
        She also serves as editor and reviewer for various journals.
      `
    }
  },
  'Responsible BPM Forum': {
    'Mahendrawathi Erawan': {
      image: Mahendra,
      institution: 'Institut Teknologi Sepuluh Nopember',
      location: 'Surabaya, Indonesia',
      email: 'mahendrawathi.er@gmail.com',
      bio: `
        Mahendrawathi Erawan is a full Professor and the Head of the Enterprise Systems Laboratory
        in the Information Systems Department, Institut Teknologi Sepuluh Nopember, Surabaya, Indonesia.
        She specializes in Business Process Management, Enterprise Resource Planning, and
        Supply Chain Management and has written books in all three domains.  Her research interests
        include entrepreneurial process management, inclusive business process management and digital transformation.
        Her research has been published in various academic journals. She is passionate about applying
        process-oriented approaches to empower individuals and organizations to drive positive
        societal impact and contribute toward achieving the Sustainable Development Goals.
      `
    },
    'Avigdor Gal': sharedPeopleData['Avigdor Gal'],
    'Thomas Grisold': {
      image: ThomasGrisold,
      location: 'St. Gallen, Switzerland',
      institution: 'University of St. Gallen',
      email: 'thomas.grisold@unisg.ch',
      bio: `
        Thomas Grisold is an assistant professor at the University of St. Gallen.
        Thomas studies the dynamics of business processes. He applies a variety of theoretical lenses,
        such as routine dynamics theory, affordance theory, or predictive mind theory.
        He uses mixed-methods research designs combining qualitative-inductive theorizing with
        computationally-intensive analyses of digital traces. Thomas’ work has contributed to research
        in business process management, information systems, and organization studies.
        He obtained his PhD from WU Vienna and was a a visiting researcher at the University of Notre Dame (US),
        the Queensland University of Technology (AUS) and Lancaster University (UK).
      `
    },
    'Flavia Santoro': sharedPeopleData['Flavia Santoro']
  },
  'Industry Forum': {
    'Andrés Jiménez-Ramírez': {
      image: AndresJimenezRamirez,
      ...USData,
      email: 'ajramirez@us.es',
      bio: `
        Andrés Jiménez Ramírez is a lecturer and researcher at the University of Seville.
        He started his career as a software engineer in the R&D department of a Spanish consultancy firm.
        In 2010 he transitioned to the University, where he is a member of the Engineering and Science for Software Systems (ES3) research group.
        He is currently an Associate Professor at the Computer Languages and Systems department and also works as a Software Engineer at Vitaltech.

        His main research interests are Process Automation, Human Factors, Flexible Process Modelling, and Constraint Programming.
        In these areas, he has co-authored more than 30 contributions to prestigious international conferences and journals and
        participated in 7 research projects and over 20 technology transfer projects involving IT companies.
      `
    },
    'Hugo A. López': {
      email: 'hulo@dtu.dk',
      institution: 'Technical University of Denmark',
      location: 'Lyngby, Denmark',
      image: HugoALopez,
      bio: `
        Hugo A. López holds an associate professor position at the Technical University of Denmark.
        His research objectives involve the maturing of a new generation of process technologies that
        can adapt to citizen needs while still being compliant with regulations and laws. Such technologies
        should have a digital component in terms of software tools that support the digitalization of work processes.
        Finally, technologies should be understandable, even for people who do not have a computer science background.
        He is an active researcher in the business process management and formal methods communities.
        Previous academic positions include assistant professorships at DTU and Copenhagen University and postdoctoral
        positions at IT University of Copenhagen, The University of Lisbon, and DTU.
        His industry experience includes positions in software consultancy and product ownership at different firms in Denmark,
        and he regularly supports Danish companies in technology transfer and applied research initiatives.
        Currently, he is the leader of the Danish Center For Digital Compliance.
      `
    },
    'Estefanía Serral Asensio': {
      image: EstefaniaSerral,
      institution: 'KU Leuven',
      location: 'Leuven, Belgium',
      email: 'estefania.serralasensio@kuleuven.be',
      bio: `
        Estefanía Serral is an Associate Professor at KU Leuven (Belgium). She has a highly international and
        interdisciplinary profile. Her research center in improving businesses and societal challenges using
        the Internet of Things in combination with Business Process Management and/or data analytics.
        In 2018, she was also an Assistant professor at TU/e, The Netherlands. From 2012 to 2014, she led the
        Semantic Knowledge Representation and Integration research group at the CDL-Lab
        at the Technical University of Vienna (Austria). Until 2012, she worked in the ProS Research Center
        at the Technical University of Valencia (Spain), where she designed a novel method for developing
        ubiquitous systems using Model-Driven Development (MDD) and Semantic technologies.
        Prof. Serral has many publications in high-ranking conferences and journals,
        such as CAiSE, ER, UIC, PMC, ESWA, SOSYM, MTAP, etc.
        She completed her PhD in Computer science in 2011; a Master Degree on Software Engineering,
        Formal Methods and Information Systems in 2008; and a bachelor degree in Computer science in 2006.
      `
    }
  },
  'Education Forum': {
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
    'Wasana Bandara': {
      image: WasanaBandara,
      email: 'w.bandara@qut.edu.au',
      institution: 'Queensland University of Technology (QUT)',
      location: 'Brisbane, Australia',
      bio: `
        Dr. Bandara is a fully tenured Associate Professor at the School of Information Systems,
        Queensland University of Technology (QUT), Brisbane. As an internationally recognized expert
        in Business Process Management (BPM) and Information Systems (IS), she specializes in
        human-centric process management, digital transformation, and enterprise-wide process capability building,
        with a strong desire for leveraging technology for the greater good. Dr. Bandara is a sought-after
        keynote speaker and the author of over 140 publications on BPM and IS theory and practice.
        She has been recognized with multiple national and international awards for Research Excellence and
        Teaching Excellence and have mentored award-winning research students. She is a passionate educator
        who creates an engaging learning environment through real-world applications and contemporary teaching methods.
        Her philosophy bridges theory and practice, equipping students with both knowledge and practical skills
        for real-world challenges. Beyond academia Dr. Bandara is actively involved in research collaborations with
        a global network of experts and serves as a consultant to government and industry, helping organizations
        innovate and enhance productivity through IT and process changes. Her work spans various sectors,
        including public administration, healthcare, insurance, banking, education, and manufacturing.
      `
    },
    'Kate Revoredo': {
      image: KateRevoredo,
      email: 'kate.revoredo@hu-berlin.de',
      institution: 'Humboldt-Universität zu Berlin',
      location: 'Berlin, Germany',
      bio: `
        Kate Revoredo is a research associate at the Chair of Process Management and Information Systems
        at Humboldt-Universität zu Berlin. She specializes in Business Process Management, Data Management, and
        Information Systems, with a focus on data-centric approaches. Kate obtained her habilitation (Privatdozentin)
        in Information Systems from WU Vienna. She earned her Ph.D. in Computer Science and Engineering from the
        Federal University of Rio de Janeiro, where her thesis on probabilistic machine learning received national recognition.
        With over 100 published scientific contributions, her work appears in leading journals such as Information Systems, Computers in Industry and Machine Learning, and top conferences like BPM and CAiSE. Previously, she was an assistant professor at WU Vienna and an associate professor at Federal University of the State of Rio de Janeiro. Kate has taught 25 different courses across various levels, including executive education, and finds great satisfaction in designing stimulating and challenging courses that focus on enhancing the student learning experience.
      `
    }
  },
  'Tutorial & Panel': {
    'Marco Comuzzi': {
      image: MarcoComuzzi,
      institution: 'Ulsan National Institute of Science and Technology (UNIST)',
      email: 'mcomuzzi@unist.ac.kr',
      location: 'Ulsan, South Korea',
      bio: `
        Marco Comuzzi is Associate Professor and Director of the Blockchain Research Center
        at the Department of Industrial Engineering, Ulsan National Institute of Science and Technology (UNIST),
        in Ulsan (South Korea). He has held academic full-time positions at
        the Eindhoven University of Technology, The Netherlands, and City, University of London, United Kingdom.
        His research is in the broad area of information systems design and data science,
        with a specific focus on process mining and blockchain technology.
        He has published more than 90 papers in international peer-reviewed outlets and
        recently wrote a textbook on blockchain systems.
      `
    },
    'Jorge Muñoz-Gama': {
      image: JorgeMunozGama,
      institution: 'Pontificia Universidad Católica de Chile',
      location: 'Santiago, Chile',
      email: 'jmun@uc.cl',
      bio: `
        Born in Barcelona, Jorge Munoz-Gama is Director of the Human & Process Research Lab (HAPLAB) and
        Associate Professor at the Pontificia Universidad Católica de Chile.
        Doctor in Computation from the Universitat Politècnica de Catalunya, he received his Bachelor in
        Informatics Engineering from the same university. His research fields of interest include 'Processes' and
        'Process Mining', specially applied to Education and Medical Education, among other areas.
        He has authored more than 80 publications on the topic, including the book
        'Conformance Checking and Diagnosis in Process Mining' (Springer 2016).
        He is a Steering Committee member of the IEEE Task Force on Process Mining and he organizes the Workshop
        'Education Meets Process Mining' (EduPM).
      `
    },
    'Victoria Torres': {
      image: VictoriaTorres,
      email: 'victorbo@upv.edu.es',
      institution: 'Universitat Politècnica de València',
      location: 'Valencia, Spain',
      bio: `
        Victoria Torres Bosch is a Lecturer and a member of the Software Production Methods (PROS)
        research center and the Valencian Research Institute for Artificial Intelligence (VRAIN) at
        the Universitat Politècnica de València (Spain). She works actively in areas such as Business Process Management,
        Microservices architecture, Process Variability, the Internet of Things, Web Engineering, and Model-Driven Development.
        She has published several papers and articles in journals such as
        Information and Software Technology, Information Systems, and Software and System Modeling.
        For many years, she has actively participated in various National and European Projects in which PROS has been involved.
      `
    }
  },
  'Doctoral Consortium': {
    'Benoit Depaire': {
      image: BenoitDepaire,
      institution: 'Hasselt University',
      location: 'Hasselt, Belgium',
      email: 'benoit.depaire@uhasselt.be',
      bio: `
        Benoit Depaire is Professor of Business Informatics at Hasselt University, Belgium and
        affiliated with the Digital Future Lab. His research interests focus on machine learning, statistics and
        other computational methods to gain valuable business insights from data, as well as on the philosophy and
        methodology of experimental algorithm design. His research has been published, among others,
        in Business and Information Systems Engineering, Decision Support Systems, Knowledge-Based Systems, Journal of Heuristics and
        IEEE Transactions on Services Computing. He is one of the founding organizers of the
        International Workshop on Event Data and Behavioral Analytics and leads the applied research unit BIARU.
      `
    },
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
    },
    'Flavia Santoro': sharedPeopleData['Flavia Santoro']
  },
  'Journal First Track': {
    'Niels Martin': {
      email: 'niels.martin@uhasselt.be',
      institution: 'Hasselt University',
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
  },
  'Publicity': {
    'Daniel Calegari': {
      image: DanielCalegari,
      institution: 'Universidad ORT Uruguay & Universidad de la República',
      email: 'dcalegar@fing.edu.uy',
      location: 'Montevideo, Uruguay',
      bio: `
        Daniel Calegari is a researcher and professor at Universidad ORT Uruguay and an
        Associate Professor at Universidad de la República, Uruguay. He is also a Researcher Level 1 at
        Agencia Nacional de Investigación e Innovación (ANII) and a Researcher Grade 3 at
        Programa de Desarrollo de las Ciencias Básicas (PEDECIBA). His research mainly focuses on
        adopting a model-centric approach for reasoning (e.g., applying process mining in heterogeneous contexts) and
        promoting modeling as the primary software engineering activity (e.g., concerning business process management).
      `
    },
    'Orlenys López Pintado': {
      image: OrlenysLopezPintado,
      email: 'orlenys.lopez.pintado@ut.ee',
      institution: 'University of Tartu',
      location: 'Tartu, Estonia',
      bio: `
        Orlenys López Pintado is a Research Fellow in Information Systems at the University of Tartu, Estonia.
        In 2018, he spent six months as a visiting research scholar at CSIRO Data 61 Lab in Sydney, Australia.
        His research interests include business process management (BPM), business process simulation, optimization, and blockchain.
        His current area of research is data-driven discovery, simulation, and optimization of business processes.
        He received a PhD in Computer Science in 2020 at the University of Tartu, for which he obtained the best dissertation award at the CAiSE’21.
      `
    },
    'Rehan Syed': {
      email: 'r.syed@qut.edu.au',
      institution: 'Queensland University of Technology',
      location: 'Brisbane, Australia',
      image: RehanSyed,
      bio: `
        Syed is a leading expert and lecturer in Business Process Management (BPM) and Information Systems
        at Queensland University of Technology, Australia. His research focuses on the socio-technical aspects of
        Process Automation, Cyber-Human Systems, and Business Process Management for Transparency (BPM4T) in the public sector.
        Syed has maintained his technical expertise through active consultancy work with the World Bank and various government ICT organizations globally.
      `
    }
  },
  'Proceedings': {
    'Simone Agostinelli': {
      image: SimoneAgostinelli,
      email: 'agostinelli@diag.uniroma1.it',
      institution: 'Sapienza Università di Roma',
      location: 'Rome, Italy',
      bio: `
        Simone Agostinelli received his Ph.D. in Engineering in Computer Science from Sapienza Università di Roma in 2022.
        He is currently an Assistant Professor in Engineering in Computer Science at Sapienza Università di Roma.
        His research spans the wide spectrum of Business Process Management (BPM) with a particular focus on Robotic Process Automation (RPA).
        He published at very good conferences (EDOC, ICSOC, RCIS), top conferences (BPM, CAiSE, ICPM) and
        highly ranked scientific journals (Computers in Industry, Information Systems), which demonstrates the scientific rigor and
        relevance of his work. In 2019, he received the Forum Award at the 31st International Conference on
        Advanced Information Systems Engineering (CAiSE'19). His PhD thesis won the 2023 Best BPM Dissertation Award at the
        21st International Conference on Business Process Management (BPM'23). He served as both the PC Chair of the RPA Forum and
        the Proceedings Chair for the BPM'24 conference. He is currently the Proceedings Chair for the BPM'25 conference.
      `
    },
    'Johannes De Smedt': {
      image: JohannesSmedt,
      email: 'johannes.desmedt@kuleuven.be',
      institution: 'KU Leuven',
      location: 'Leuven, Belgium',
      bio: `
        Johannes De Smedt is an Assistant Professor at the Department of Decision Sciences and
        Information Management at the Faculty of Economics and Business of KU Leuven, Belgium.
        He holds a PhD in Information Systems Engineering and previously held the Dixons Carphone (Senior)
        Lectureship in Business Analytics at the University of Edinburgh. His research interests
        include declarative process approaches, the analysis of ordered data, including sequence mining,
        time series, as well as process analytics geared towards process model forecasting and XAI
        in predictive process monitoring. He has published over 30 journal papers in major outlets including
        IEEE Transactions on Knowledge and Data Engineering, Knowledge-Based Systems,
        and Decision Support Systems, and has published in the proceedings of and is programme committee
        member of numerous conferences including the International Conference on Business Process Management,
        Advanced Information Systems Engineering, and Process Mining.
      `
    }
  }
};

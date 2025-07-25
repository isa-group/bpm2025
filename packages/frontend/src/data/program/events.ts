import Rectorate from '#/assets/images/program/events/rectorate.jpg';
import Alcazar from '#/assets/images/program/events/alcazar.jpg';
import Abades from '#/assets/images/program/events/abades.jpg';
import Raza from '#/assets/images/program/events/raza.jpg';

export const events = [
  {
    name: 'Welcome Reception',
    date: 'Monday, Sept 1st, 2025',
    location: '<a href="https://maps.app.goo.gl/zPfQMFLF2J9hASJ18">Royal Tobacco Factory</a>',
    image: Rectorate,
    description: `
      <p>
        Our welcome reception will be held in the former Royal Tobacco Factory, a magnificent 18th-century stone
        building that was Europe’s first tobacco factory and a masterpiece of industrial architecture from the Old Regime.
        Featuring elegant courtyards adorned with marble fountains, this historic site now serves as the rectorate of
        the University of Seville.
      </p>
    `
  },
  {
    name: 'Guided tour',
    date: 'Tuesday, Sept 2nd, 2025',
    location: '<a href="https://maps.app.goo.gl/CvNYrTSQT8pg422L6">Reales Alcázares</a>',
    imageClass: 'aspect-ratio-[16/14] object-[0_90%] lg:aspect-ratio-[1/1]',
    image: Alcazar,
    description: `
      <p>
        On Tuesday, we will enjoy a private guided visit to the Real Alcázar of Seville, a breathtaking
        palace originally built by Moorish Muslim kings and considered one of Spain’s most beautiful landmarks.
        As Europe’s oldest royal palace still in use, its upper levels serve as the official Seville residence of
        the Spanish royal family. The palace is also home to stunning gardens, featuring Moorish and Renaissance designs,
        tranquil ponds, exotic trees, and picturesque pavilions. Together with the Cathedral of Seville and the
        General Archive of the Indies, the Alcázar is recognized as a UNESCO World Heritage Site. 
      </p>
    `
  },
  {
    name: 'Conference Dinner',
    date: 'Wednesday, Sept 3rd, 2025',
    location: '<a href="https://maps.app.goo.gl/U7eUfztafMcwWH2HA">Abades Triana</a>',
    image: Abades,
    imageClass: 'aspect-ratio-[16/14] object-top lg:aspect-ratio-[1/1]',
    description: `
      <p>
        Our conference dinner promises to be a memorable experience. Hosted at Abades Triana, an elegant restaurant
        on the banks of the Guadalquivir River, we will savor avant-garde Andalusian cuisine, blending tradition
        with innovation. As we dine, we will enjoy spectacular views of some of Seville’s most iconic landmarks,
        including the Torre del Oro, the Giralda, and the Maestranza bullring.
      </p>
    `
  },
  {
    name: 'Farewell Party',
    date: 'Thursday, Sept 4th, 2025',
    location: '<a href="https://maps.app.goo.gl/h5mwg9q3L65h9mSD8">La Raza Puerto</a>',
    image: Raza,
    description: `
      <p>
        To close the conference, we’ll gather on Thursday evening at La Raza Puerto, a lively restaurant by the 
        Guadalquivir River. We’ll kick off with a cocktail and some light food in a relaxed setting, followed by 
        drinks and music to celebrate the end of the main conference days. It will be a great moment to unwind, 
        chat with other participants, and enjoy a fun evening together in one of Seville’s most pleasant riverside 
        venues.
      </p>
    `
  },
];

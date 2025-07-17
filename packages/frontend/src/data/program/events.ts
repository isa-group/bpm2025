import Rectorate from '#/assets/images/program/events/rectorate.jpg';
import Alcazar from '#/assets/images/program/events/alcazar.jpg';
import Abades from '#/assets/images/program/events/abades.jpg';

export const events = [
  {
    name: 'Welcome Reception',
    date: 'Monday, Sept 1st, 2025',
    location: 'Royal Tobacco Factory',
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
    location: 'Reales Alcázares',
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
    location: 'Abades Triana',
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
  }
];

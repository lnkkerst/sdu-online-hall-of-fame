import type { Person } from './Person';
import type { SwipeImage } from './SwipeImage';
import type { Experience } from './Experience';

export interface HallOfFameData {
  swipeImages: SwipeImage[];
  honors: {
    excellentTutors: Person[];
    annualNominations: Person[];
    personOfTheYear: Person[];
  };
  experiences: Experience[];
}

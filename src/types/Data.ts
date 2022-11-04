import type { Person } from './Person';
import type { SwipeImage } from './SwipeImage';

export interface HallOfFameData {
  swipeImages: SwipeImage[];
  honors: {
    excellentTutors: Person[];
    annualNominations: Person[];
    personOfTheYear: Person[];
  };
}

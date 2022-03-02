import { amenitiesType } from '@/types/reduxActionTypes/ReduxRyokanType';
import Amenities from '../staticData/Amenities';

const findTruthyAmenities = (amenities: amenitiesType) =>
  (Object.keys(amenities) as Array<keyof amenitiesType>)
    .map((amenityKey) => {
      if (amenities[amenityKey]) return Amenities[amenityKey];
    })
    .filter((result) => result !== undefined)
    .join(', ');

export default findTruthyAmenities;

import React from 'react';
import { amenitiesType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import Amenities from '@/lib/staticData/Amenities';

interface IProps {
  ryokanType: string;
  title: string;
  personnel: number;
  bedroomCount: number;
  bedsCount: number;
  bathroomCount: number;
  ryokanAmenities: amenitiesType;
}

const SearchItem = React.forwardRef<any, IProps>(
  (
    {
      ryokanType,
      title,
      personnel,
      bedroomCount,
      bedsCount,
      bathroomCount,
      ryokanAmenities,
    },
    ref
  ) => {
    const getTruthyAmenities = (amenities: amenitiesType) =>
      (Object.keys(amenities) as Array<keyof amenitiesType>)
        .map((amenityKey) => {
          if (ryokanAmenities[amenityKey]) return Amenities[amenityKey];
        })
        .filter((result) => result !== undefined);

    return (
      <div ref={ref}>
        <div>
          <span data-testid="ryokan-type-text">{ryokanType}</span>
        </div>
        <div>
          <span data-testid="ryokan-title-text">{title}</span>
        </div>
        <div>
          <span data-testid="ryokan-basic-info">
            {[personnel, bedroomCount, bedsCount, bathroomCount].join(', ')}
          </span>
          <span data-testid="ryokan-amenities">
            {getTruthyAmenities(ryokanAmenities).join(', ')}
          </span>
        </div>
      </div>
    );
  }
);

export default React.memo(SearchItem);

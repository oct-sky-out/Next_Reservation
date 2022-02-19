// * test modules
import { render, screen } from '@testing-library/react';

// * component modules
import { amenitiesType } from '../../../types/reduxActionTypes/ReduxRegiserRyokanType';
import Amenities from '../../..//lib/staticData/Amenities';

interface IProps {
  ryokanType: string;
  title: string;
  personnel: number;
  bedroomCount: number;
  bedsCount: number;
  bathroomCount: number;
  amenities: amenitiesType;
}

const SearchItem: React.FC<IProps> = ({
  ryokanType,
  title,
  personnel,
  bedroomCount,
  bedsCount,
  bathroomCount,
  amenities,
}) => {
  const getTruthyAmenities = (amenities: amenitiesType) => {
    return Object.keys(amenities)
      .map((amenityKey) => {
        if (amenities[amenityKey]) return Amenities[amenityKey];
      })
      .filter((result) => result !== undefined);
  };

  return (
    <div>
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
          {getTruthyAmenities(amenities).join(', ')}
        </span>
      </div>
    </div>
  );
};

describe('검색 결과 항목 표시', () => {
  test('검색 결과 아이템을 IProps의 타입의 데이터로 주입 시 정상적으로 렌더링이 되는가?', async () => {
    render(
      <SearchItem
        ryokanType="양실"
        title="해운대 바다뷰"
        personnel={3}
        bedroomCount={2}
        bathroomCount={1}
        bedsCount={3}
        amenities={{
          breakfast: true,
          closet: false,
          coolingEquipment: true,
          heatingEquipment: true,
          internet: true,
          toiletries: false,
          hairdryer: false,
          tv: false,
        }}
      />
    );
    const ryokanType = await screen.getByTestId<HTMLSpanElement>(
      'ryokan-type-text'
    );
    const ryokanTitle = await screen.getByTestId<HTMLSpanElement>(
      'ryokan-title-text'
    );
    const ryokanBasicInformation = await screen.getByTestId<HTMLSpanElement>(
      'ryokan-basic-info'
    );
    const ryokanAmenities = await screen.getByTestId<HTMLSpanElement>(
      'ryokan-amenities'
    );

    expect(ryokanType.innerHTML).toBe('양실');
    expect(ryokanTitle.innerHTML).toBe('해운대 바다뷰');
    expect(ryokanBasicInformation.innerHTML).toBe('3, 2, 3, 1');
    expect(ryokanAmenities.innerHTML).toEqual(
      '아침식사, 냉방시설, 난방시설, 인터넷'
    );
  });
});

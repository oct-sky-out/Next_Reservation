import findTruthyAmenities from '@/lib/utils/findTruthyAmenities';

test('편의 시설이 존재하지 않을 시 편의시설의 결과는 빈 문자열이어야한다.', () => {
  const amenities = {
    breakfast: false,
    closet: false,
    coolingEquipment: false,
    heatingEquipment: false,
    internet: false,
    toiletries: false,
    hairdryer: false,
    tv: false,
  };
  expect(findTruthyAmenities(amenities)).toEqual('');
});

test('편의 시설이 존재시 편의시설의 결과는 문자열 이어야한다.', () => {
  const amenities = {
    breakfast: false,
    closet: false,
    coolingEquipment: true,
    heatingEquipment: true,
    internet: false,
    toiletries: false,
    hairdryer: true,
    tv: false,
  };
  expect(findTruthyAmenities(amenities)).toBe(
    '냉방시설, 난방시설, 헤어드라이기'
  );
});

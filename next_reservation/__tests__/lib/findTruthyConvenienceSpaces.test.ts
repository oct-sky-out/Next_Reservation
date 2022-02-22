import findTruthyConveniences from '@/lib/utils/findTruthyConveniences';

test('편의공간이 존재하지 않을 시 편의공간의 결과는 빈 문자열이어야한다.', () => {
  const convenienceSpaces = {
    gym: false,
    jacuzzi: false,
    parkingLot: false,
    swimmingPool: false,
    washingMachine: false,
    garden: false,
  };
  expect(findTruthyConveniences(convenienceSpaces)).toEqual('');
});

test('편의공간이 존재시 편의공간의 결과는 문자열 이어야한다.', () => {
  const convenienceSpaces = {
    gym: true,
    jacuzzi: false,
    parkingLot: true,
    swimmingPool: false,
    washingMachine: false,
    garden: false,
  };
  expect(findTruthyConveniences(convenienceSpaces)).toBe('헬스장, 주차장');
});

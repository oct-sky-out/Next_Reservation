import { registerRyokanActions } from '../../store/searchResultsRyokans';
import { useMockStore } from '../../store';
import { useDispatchMock } from '../../__mocks__/redux/reduxStateMocks';

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
});

test('AJAX 요청으로 주변 지역의 료칸 정보를 가져온 후 결과를 대입한다.', () => {
  expect(store.getState().searchResultRyokan.searchResult).toEqual([]);
  store.dispatch(
    registerRyokanActions.setSearchResults({
      searchResult: [1, 2].map((_value) => ({
        imageUrl: 'url',
        pricePerDay: 10000,
        ryokanInformation: {
          amenities: {
            breakfast: false,
            closet: false,
            coolingEquipment: false,
            heatingEquipment: false,
            internet: false,
            toiletries: false,
            hairdryer: false,
            tv: false,
          },
          convenienceSpaces: {
            gym: false,
            jacuzzi: false,
            parkingLot: false,
            swimmingPool: false,
            washingMachine: false,
            garden: false,
          },
          bathroomCount: 1,
          bedrooms: { bedCount: 3, bedroomCount: 2, people: 4 },
        },
        title: 'wellcome!',
      })),
    })
  );
  expect(store.getState().searchResultRyokan.searchResult[0].imageUrl).toEqual(
    'url'
  );
});

test('사용자가 필터링으로 요금을 필터한다.', () => {
  expect(store.getState().searchResultRyokan.filter.filterPricePerDay).toEqual({
    min: 0,
    max: 1000000,
  });
  store.dispatch(
    registerRyokanActions.setFilterPricePerDay({ min: 2000, max: 100000 })
  );
  expect(store.getState().searchResultRyokan.filter.filterPricePerDay).toEqual({
    min: 2000,
    max: 100000,
  });
});

test('사용자가 편의 시설을 필터한다.', () => {
  expect(
    store.getState().searchResultRyokan.filter.filterConvenienceSpaces
  ).toEqual({
    gym: false,
    jacuzzi: false,
    parkingLot: false,
    swimmingPool: false,
    washingMachine: false,
    garden: false,
  });
  store.dispatch(
    registerRyokanActions.setFilterConvenienceSpace({
      gym: true,
      jacuzzi: false,
      parkingLot: false,
      swimmingPool: false,
      washingMachine: true,
      garden: false,
    })
  );
  expect(
    store.getState().searchResultRyokan.filter.filterConvenienceSpaces
  ).toEqual({
    gym: true,
    jacuzzi: false,
    parkingLot: false,
    swimmingPool: false,
    washingMachine: true,
    garden: false,
  });
});

test('사용자가 료칸 유형을 필터한다.', () => {
  expect(store.getState().searchResultRyokan.filter.filterRyokanType).toEqual(
    ''
  );
  store.dispatch(registerRyokanActions.setFilterRyokanType('Western'));
  expect(store.getState().searchResultRyokan.filter.filterRyokanType).toEqual(
    'Western'
  );
});

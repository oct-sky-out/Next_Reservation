import { ryokanDetailActions } from '../../store/ryokanDetail';
import { useMockStore } from '../../store';
import { useDispatchMock } from '../../__mocks__/redux/reduxStateMocks';

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
});

describe('료칸 상세페이지 이동시 리덕스의 상태 변경', () => {
  test('료칸 리스트에서 료칸 정보 하나를 클릭 시 료칸 상세페이지 리덕스 상태에 료칸 상세정보가 등록된다.', () => {
    store.dispatch(
      ryokanDetailActions.setRyokanDetail({
        ryokanType: 'Japanese-Western',
        buildingType: 'Rental_Cottage',
        isBuiltInOnsen: false,
        bedrooms: {
          bedroomList: { bedroom0: [{ bedType: 'single', count: 2 }] },
          bedroomCount: 1,
          personnel: 3,
        },
        bathrooms: {
          bathCount: 1,
          isShared: false,
        },
        location: {
          contry: '서울특별시',
          address: '123',
          detailAddress: '1234-1234',
          postCode: '12345',
          latitude: 12.12,
          longitude: 11.11,
        },
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
        photos: [],
        title: 'hello world',
        description: 'hello',
        pricePerDay: '1,200',
        date: { openDate: new Date(), closeDate: null },
      })
    );

    expect(store.getState().ryokanDetail.title).toBe('hello world');
  });

  test('료칸 상세정보를 초기화 시킨다.', () => {
    store.dispatch(
      ryokanDetailActions.setRyokanDetail({
        ryokanType: 'Japanese-Western',
        buildingType: 'Rental_Cottage',
        isBuiltInOnsen: false,
        bedrooms: {
          bedroomList: { bedroom0: [{ bedType: 'single', count: 2 }] },
          bedroomCount: 1,
          personnel: 3,
        },
        bathrooms: {
          bathCount: 1,
          isShared: false,
        },
        location: {
          contry: '서울특별시',
          address: '123',
          detailAddress: '1234-1234',
          postCode: '12345',
          latitude: 12.12,
          longitude: 11.11,
        },
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
        photos: [],
        title: 'hello world',
        description: 'hello',
        pricePerDay: '1,200',
        date: { openDate: new Date(), closeDate: null },
      })
    );

    store.dispatch(ryokanDetailActions.initDetail());
    expect(store.getState().ryokanDetail.title).toBe('');
  });
});

import { reservationActions } from '../../store/reservation';
import { useMockStore } from '../../store';
import { useDispatchMock } from '../../__mocks__/redux/reduxStateMocks';
import { ryokanManageFormActions } from '@/store/ryokanManageForm';

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
});

describe('료칸 관리자가 료칸정보를 수정할 시', () => {
  test('관리자가 료칸관리 페이지에 랜딩 후 수정버튼을 누를 시 리덕스 스토어에 수정된다.', () => {
    store.dispatch(
      ryokanManageFormActions.setRyokanId({ ryokanId: '1234ABC' })
    );
    expect(store.getState().ryokanManage.ryokanId).toBe('1234ABC');
  });

  test('관리자가 각 정보를 수정할 경우 리덕스 스토어에 수정된다.', () => {
    const updateRyokan = {
      ryokanData: {
        ryokanManager: 'admin',
        ryokanType: 'Western',
        buildingType: '',
        isBuiltInOnsen: false,
        bedrooms: {
          bedroomList: { bedroom0: [{ bedType: 'single', count: 0 }] },
          bedroomCount: 1,
          personnel: 0,
        },
        bathrooms: {
          bathCount: 0,
          isShared: false,
        },
        location: {
          contry: '',
          address: '',
          detailAddress: '',
          postCode: '',
          latitude: 0,
          longitude: 0,
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
        title: '',
        description: '',
        pricePerDay: '',
        date: { openDate: null, closeDate: null },
      },
    };
    store.dispatch(ryokanManageFormActions.setManageRyokan(updateRyokan));

    expect(store.getState().ryokanManage.ryokanData).toEqual(
      updateRyokan.ryokanData
    );
  });
});

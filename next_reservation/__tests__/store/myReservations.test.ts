import { myReservationsActions } from '../../store/myReservations';
import { useMockStore } from '../../store';
import { useDispatchMock } from '../../__mocks__/redux/reduxStateMocks';
import { MyReservations } from '@/types/reduxActionTypes/ReduxMyReservaitonType';

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
});

describe('료칸 예약 내역을 조회 시 료칸 예약 정보 리스트가 리덕스 스토어에 저장되어야함', () => {
  test('', async () => {
    store.dispatch(
      myReservationsActions.setReservaions([
        {
          reservedData: {
            adultCount: 1,
            childrenCount: 1,
            infantsCount: 0,
            checkOut: '2022-04-22T15:00:00.000Z',
            checkIn: '2022-02-04T15:00:00.000Z',
            reserveId: 'asd',
          },
          reservedRyokan: {
            bathrooms: { bathCount: 1, isShared: false },
            bedrooms: {
              bedroomCount: 1,
              bedroomList: { bedroom: [] },
              personnel: 1,
            },
            pricePerDay: '54,000',
            photos: [],
            date: {
              closeDate: new Date('2022-04-22T15:00:00.000Z'),
              openDate: new Date('2022-02-04T15:00:00.000Z'),
            },
            title: '절 바로 옆에서 료칸을 즐겨요',
            isBuiltInOnsen: false,
            convenienceSpaces: {
              garden: false,
              jacuzzi: false,
              gym: false,
              parkingLot: true,
              washingMachine: true,
              swimmingPool: false,
            },
            buildingType: 'Rental_Cottage',
            description: '수련하기 좋은 료칸',
            location: {
              detailAddress: '',
              longitude: 129.00618874226538,
              contry: '대한민국',
              postCode: '626-810',
              address: '경상남도 양산시 물금읍 범어리 1375',
              latitude: 35.32005607699994,
            },
            ryokanType: 'Western',
            amenities: {
              internet: true,
              hairdryer: false,
              heatingEquipment: false,
              toiletries: false,
              closet: true,
              breakfast: true,
              tv: false,
              coolingEquipment: false,
            },
          },
        },
      ])
    );
    (store.getState().myReservations as MyReservations).forEach(
      (reservedRyokan) => {
        expect(reservedRyokan.reservedData.reserveId).toBe('asd');
      }
    );
  });
});

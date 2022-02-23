import { reservationActions } from '../../store/reservation';
import { useMockStore } from '../../store';
import { useDispatchMock } from '../../__mocks__/redux/reduxStateMocks';

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
});

describe('사용자가 예약 양식을 수정할 시', () => {
  test('사용자가 예약 인원수 어른, 어린이, 영유아의 수가 수정될 경우 리덕스 스토어에 수정된다.', () => {
    store.dispatch(reservationActions.setAdultCount(1));
    store.dispatch(reservationActions.setChildrenCount(2));
    store.dispatch(reservationActions.setInfantsCount(3));

    expect(store.getState().reservation.adultCount).toBe(1);
    expect(store.getState().reservation.childrenCount).toBe(2);
    expect(store.getState().reservation.infantsCount).toBe(3);
  });

  test('사용자가 예약일정을 수정할 경우 리덕스 스토어에 수정된다.', () => {
    store.dispatch(
      reservationActions.setDate({
        startDate: new Date('2022-02-01'),
        endDate: new Date('2022-02-03'),
      })
    );
    expect(store.getState().reservation.startDate).toEqual(
      new Date('2022-02-01')
    );
    expect(store.getState().reservation.endDate).toEqual(
      new Date('2022-02-03')
    );

    store.dispatch(reservationActions.setStartDate(new Date('2022-03-02')));
    store.dispatch(reservationActions.setEndDate(new Date('2022-03-03')));
    expect(store.getState().reservation.startDate).toEqual(
      new Date('2022-03-02')
    );
    expect(store.getState().reservation.endDate).toEqual(
      new Date('2022-03-03')
    );
  });
  test('사용자가 예약확인 버튼을 누를 시 료칸ID값을 저장한다.', () => {
    store.dispatch(reservationActions.setRyokanId('asd1234'));
    expect(store.getState().reservation.ryokanId).toBe('asd1234');
  });
});

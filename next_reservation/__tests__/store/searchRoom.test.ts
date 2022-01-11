import { searchRoomActions } from '../../store/searchRoom';
import { useMockStore } from '../../store';
import { useDispatchMock } from '../../__mocks__/redux/reduxStateMocks';

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
});

test('검색창에 지역이름 입력하였을 시 location state가 변경되어야한다.', () => {
  expect(store.getState().searchRoom.location).toBe('');

  store.dispatch(searchRoomActions.setLocation('서울특별시'));

  expect(store.getState().searchRoom.location).toBe('서울특별시');
});
test('내위치 기준에서 조회시 latitude와 longitude의 state가 변경되어야한다.', () => {
  expect(store.getState().searchRoom.latitude).toBe(0);
  expect(store.getState().searchRoom.longitude).toBe(0);

  store.dispatch(
    searchRoomActions.setMyPosition({ latitude: 10, longitude: 20 })
  );

  expect(store.getState().searchRoom.latitude).toBe(10);
  expect(store.getState().searchRoom.longitude).toBe(20);
});
test('체크인 날짜와 체크아웃 날짜를 입력시 checkInDate, checkOutDate의 state가 변경되어야한다.', () => {
  const today = new Date();
  expect(store.getState().searchRoom.checkInDate).toBe(null);
  expect(store.getState().searchRoom.checkOutDate).toBe(null);

  store.dispatch(searchRoomActions.setCheckInDate(today));
  store.dispatch(searchRoomActions.setCheckOutDate(today));

  expect(store.getState().searchRoom.checkInDate).toBe(today);
  expect(store.getState().searchRoom.checkOutDate).toBe(today);
});
test('성인 2명, 어린이 1명, 영아 2명인원을 선택시 adultCount, childernCount, infantsCount의 state가 변경되어야한다.', () => {
  expect(store.getState().searchRoom.adultCount).toBe(0);
  expect(store.getState().searchRoom.childernCount).toBe(0);
  expect(store.getState().searchRoom.infantsCount).toBe(0);

  store.dispatch(searchRoomActions.setAdultCount(2));
  store.dispatch(searchRoomActions.setChildernCount(1));
  store.dispatch(searchRoomActions.setInfantsCount(2));

  expect(store.getState().searchRoom.adultCount).toBe(2);
  expect(store.getState().searchRoom.childernCount).toBe(1);
  expect(store.getState().searchRoom.infantsCount).toBe(2);
});

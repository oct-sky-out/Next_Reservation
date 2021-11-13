import { registerRyokanActions } from '../../store/registerRyokan';
import { useMockStore } from '../../store';
import {
  mockStoreValue,
  useDispatchMock,
  useSelectorMock,
} from '../../__mocks__/redux/reduxStateMocks';

const store = useMockStore;

beforeEach(() => {
  const dispatchMock = useDispatchMock;
  store.dispatch = dispatchMock;
  useSelectorMock.mockImplementation((selector) => selector(mockStoreValue));
});

test('셀렉터 UI를 이용해서 료칸 유형 3가지 중 료칸주가 한가지를 선택하였을 때.', () => {
  //* 료칸 타입은 총 3가지이다. "Japanese", "Western", "Japanese-Western" | "화실　和室", "양실　洋室", "화양실　和洋室"
  store.dispatch(registerRyokanActions.setRyokanType('Japanese'));
  expect(store.getState().registerRyokan.ryokanType).toEqual('Japanese');
});

test('셀렉터 UI를 이용해서 건물 유형 3가지 중 사용자가 유형 한가지를 선택하였을 때.', () => {
  //* 건물 유형은 총 3가지이다. "Rental_Cottage", "Private_Room", "Shared_Room" | "독채건물", "개인객실", "공유(도미토리)객실"
  store.dispatch(registerRyokanActions.setBuildingType('Private_Room'));
  expect(store.getState().registerRyokan.buildingType).toEqual('Private_Room');
});

test('체크박스 UI를 이용해서 료칸 객실 내부에 온천 유무를 료칸주가 선택할 때 발생.', () => {
  //* 료칸 객실 방 내부에 빌트인 온천의 존재여부 있다면 true, 없다면 false.
  store.dispatch(registerRyokanActions.setIsBuiltInOnsen(true));
  expect(store.getState().registerRyokan.isBuiltInOnsen).toEqual(true);
});

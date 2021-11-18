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

test('최대 숙박 인원울 정할 때 personnel의 state가 변화되는가?', () => {
  //* 최대 숙박 인원을 호스트가 작성한다.
  store.dispatch(registerRyokanActions.setPersonnel(5));
  expect(store.getState().registerRyokan.bedrooms.personnel).toEqual(5);
});

test('침실의 개수를 바꾸었을 때 bedroomList의 길이가 늘어나거나 줄어드는가?', () => {
  // TODO 호스트가 침실의 개수를 늘였을 때 침실의 개수만큼 2차원 배열이 늘어남
  const bedroomList = [
    [
      { bedType: '', count: 0 },
      { bedType: '', count: 0 },
    ],
  ].concat([...Array(4 - 1)].fill([{ bedType: '', count: 0 }]));
  // ! [...Array(4 - 1)] === [...Array(action.payload - state.bedrooms.bedroomList.length)],

  expect(bedroomList).toEqual([
    [
      { bedType: '', count: 0 },
      { bedType: '', count: 0 },
    ],
    [{ bedType: '', count: 0 }],
    [{ bedType: '', count: 0 }],
    [{ bedType: '', count: 0 }],
  ]);

  // TODO 호스트가 침실의 개수를 줄였을 때 2차원 배열이 줄어듬. (줄어드는 기준은 맨 끝부터.)
  const bedroomList2 = [...bedroomList.slice(0, 2)];
  expect(bedroomList2).toEqual([
    [
      { bedType: '', count: 0 },
      { bedType: '', count: 0 },
    ],
    [{ bedType: '', count: 0 }],
  ]);
});

test('침실 개수를 정했을 때 침실 수, 침실 정보(bedroomList의 길이가 늘어나거나 줄어드는가)', () => {
  // TODO 침실 수 4개와 침실 배열(bedroomList)의 길이도 4가 되어야한다.
  store.dispatch(registerRyokanActions.setBedroomCount(4));
  expect(store.getState().registerRyokan.bedrooms.bedroomCount).toEqual(4);
  expect(store.getState().registerRyokan.bedrooms.bedroomList).toHaveLength(4);
});

test('침실의 침대 정보를 수정정했을 때 침실 수, 침실 정보(bedroomList)가 바뀌는가?', () => {
  // TODO 침실 수 4개와 침실 배열(bedroomList)의 길이도 4가 되어야한다.
  store.dispatch(registerRyokanActions.setBedroomCount(4));
  expect(store.getState().registerRyokan.bedrooms.bedroomCount).toEqual(4);

  // TODO 1번 침실의 정보를 변경한다.
  store.dispatch(
    registerRyokanActions.setBedroomList({
      bedrooms: [{ bedType: 'double-bed', count: 1 }],
      index: 0,
    })
  );
  // TODO 4번 침실의 정보를 변경한다.
  store.dispatch(
    registerRyokanActions.setBedroomList({
      bedrooms: [
        { bedType: 'double-bed', count: 1 },
        { bedType: 'baby-bed', count: 2 },
      ],
      index: 3,
    })
  );

  expect(store.getState().registerRyokan.bedrooms.bedroomList).toEqual([
    [{ bedType: 'double-bed', count: 1 }],
    [
      { bedType: '', count: 0 },
      { bedType: '', count: 0 },
    ],
    [{ bedType: '', count: 0 }],
    [
      { bedType: 'double-bed', count: 1 },
      { bedType: 'baby-bed', count: 2 },
    ],
  ]);
});

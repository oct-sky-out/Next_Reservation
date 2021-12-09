import { registerRyokanActions } from '../../store/registerRyokan';
import { useMockStore } from '../../store';
import { useDispatchMock } from '../../__mocks__/redux/reduxStateMocks';

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
  store.dispatch(
    registerRyokanActions.setBedroomList({
      bedrooms: [
        [{ bedType: 'singie', count: 1 }],
        [{ bedType: 'singie', count: 1 }],
        [{ bedType: 'singie', count: 1 }],
        [{ bedType: 'singie', count: 1 }],
      ],
    })
  );
  expect(store.getState().registerRyokan.bedrooms.bedroomCount).toEqual(4);
  expect(store.getState().registerRyokan.bedrooms.bedroomList).toHaveLength(4);
});

test('침실의 침대 정보를 수정정했을 때 침실 수, 침실 정보(bedroomList)가 바뀌는가?', () => {
  // TODO 침실 수 4개와 침실 배열(bedroomList)의 길이도 4가 되어야한다.
  store.dispatch(registerRyokanActions.setBedroomCount(4));
  store.dispatch(
    registerRyokanActions.setBedroomList({
      bedrooms: [
        [{ bedType: 'singie', count: 1 }],
        [{ bedType: 'singie', count: 1 }],
        [{ bedType: 'singie', count: 1 }],
        [{ bedType: 'singie', count: 1 }],
      ],
    })
  );
  expect(store.getState().registerRyokan.bedrooms.bedroomCount).toEqual(4);

  // TODO 1번 침실의 정보를 변경한다.
  store.dispatch(
    registerRyokanActions.setBedroom({
      bedroom: [{ bedType: 'double', count: 1 }],
      roomNumber: 0,
    })
  );
  expect(store.getState().registerRyokan.bedrooms.bedroomList).toEqual([
    [{ bedType: 'double', count: 1 }],
    [{ bedType: 'singie', count: 1 }],
    [{ bedType: 'singie', count: 1 }],
    [{ bedType: 'singie', count: 1 }],
  ]);

  // TODO 4번 침실의 정보를 변경한다.
  store.dispatch(
    registerRyokanActions.setBedroom({
      bedroom: [
        { bedType: 'double-bed', count: 1 },
        { bedType: 'baby-bed', count: 2 },
      ],
      roomNumber: 3,
    })
  );

  expect(store.getState().registerRyokan.bedrooms.bedroomList).toEqual([
    [{ bedType: 'double', count: 1 }],
    [{ bedType: 'singie', count: 1 }],
    [{ bedType: 'singie', count: 1 }],
    [
      { bedType: 'double-bed', count: 1 },
      { bedType: 'baby-bed', count: 2 },
    ],
  ]);
});
test('욕실 개수(bathCount)를 변경 했을 때 개수가 변하는가?', () => {
  // TODO 욕실의 개수를 변경.
  store.dispatch(registerRyokanActions.setBathCount(3));
  expect(store.getState().registerRyokan.bathrooms.bathCount).toEqual(3);
});

test('공용 욕실 또는 개인 욕실여부(isShared)를 변경 했을 때 욕실 여부가 변하는가?', () => {
  // TODO 욕실이 다른 게스트와 함께 사용할 경우.
  store.dispatch(registerRyokanActions.setIsBathShared(true));
  expect(store.getState().registerRyokan.bathrooms.isShared).toEqual(true);
});

test('숙소의 위치를 등록, 변경하면 국가, 주소, 상세주소, 우편번호, 경도, 위도의 값이 바뀌는가?', () => {
  // TODO 숙소의 등록된 위치를 가져옴.

  // 국가
  store.dispatch(registerRyokanActions.setContry('Republic of Korea'));
  expect(store.getState().registerRyokan.location.contry).toEqual(
    'Republic of Korea'
  );

  // 주소
  store.dispatch(
    registerRyokanActions.setAddress('1, Uisadang-daero Yeongdeungpo-gu Seoul')
  );
  expect(store.getState().registerRyokan.location.address).toEqual(
    '1, Uisadang-daero Yeongdeungpo-gu Seoul'
  );

  // 상세주소
  store.dispatch(registerRyokanActions.setDetailAddress('Capitol Library'));
  expect(store.getState().registerRyokan.location.detailAddress).toEqual(
    'Capitol Library'
  );

  // 우편번호
  store.dispatch(registerRyokanActions.setPostCode('07233'));
  expect(store.getState().registerRyokan.location.postCode).toEqual('07233');

  // 위도
  store.dispatch(registerRyokanActions.setLongitude(126.917178));
  expect(store.getState().registerRyokan.location.longitude).toEqual(
    126.917178
  );

  // 경도
  store.dispatch(registerRyokanActions.setLatitude(37.531129));
  expect(store.getState().registerRyokan.location.latitude).toEqual(37.531129);
});

test('숙소 편의시설들의 유무가 바뀌는가?', () => {
  // TODO 숙소의 편의시설들의 값을 true로 바꿈.

  // 아침식사
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'breakfast',
      amenityValue: true,
    })
  );
  expect(store.getState().registerRyokan.amenities.breakfast).toEqual(true);

  // 옷장
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'closet',
      amenityValue: true,
    })
  );
  expect(store.getState().registerRyokan.amenities.closet).toEqual(true);

  // 냉방설비
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'coolingEquipment',
      amenityValue: true,
    })
  );
  expect(store.getState().registerRyokan.amenities.coolingEquipment).toEqual(
    true
  );

  // 난방설비
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'heatingEquipment',
      amenityValue: true,
    })
  );
  expect(store.getState().registerRyokan.amenities.heatingEquipment).toEqual(
    true
  );

  // 인터넷
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'internet',
      amenityValue: true,
    })
  );
  expect(store.getState().registerRyokan.amenities.internet).toEqual(true);

  // 세면도구
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'toiletries',
      amenityValue: true,
    })
  );
  expect(store.getState().registerRyokan.amenities.toiletries).toEqual(true);

  // 헤어드라이기
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'hairdryer',
      amenityValue: true,
    })
  );
  expect(store.getState().registerRyokan.amenities.hairdryer).toEqual(true);

  // 티비
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'tv',
      amenityValue: true,
    })
  );
  expect(store.getState().registerRyokan.amenities.tv).toEqual(true);

  // TODO 숙소의 편의시설들의 값을 false로 바꿈.

  // 아침식사 false
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'breakfast',
      amenityValue: false,
    })
  );
  expect(store.getState().registerRyokan.amenities.breakfast).toEqual(false);

  // 옷장 false
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'closet',
      amenityValue: false,
    })
  );
  expect(store.getState().registerRyokan.amenities.closet).toEqual(false);

  // 냉방설비 false
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'coolingEquipment',
      amenityValue: false,
    })
  );
  expect(store.getState().registerRyokan.amenities.coolingEquipment).toEqual(
    false
  );

  // 난방설비 false
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'heatingEquipment',
      amenityValue: false,
    })
  );
  expect(store.getState().registerRyokan.amenities.heatingEquipment).toEqual(
    false
  );

  // 인터넷 false
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'internet',
      amenityValue: false,
    })
  );
  expect(store.getState().registerRyokan.amenities.internet).toEqual(false);

  // 세면도구 false
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'toiletries',
      amenityValue: false,
    })
  );
  expect(store.getState().registerRyokan.amenities.toiletries).toEqual(false);

  // 헤어드라이기 false
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'hairdryer',
      amenityValue: false,
    })
  );
  expect(store.getState().registerRyokan.amenities.hairdryer).toEqual(false);

  // 티비 false
  store.dispatch(
    registerRyokanActions.setAmenities({
      amenityKey: 'tv',
      amenityValue: false,
    })
  );
  expect(store.getState().registerRyokan.amenities.tv).toEqual(false);
});

test('숙소 편의공간들의 유무가 바뀌는가?', () => {
  // TODO 숙소의 편의공간 값을 true로 바꿈.

  // 헬스장
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'gym',
      serviceValue: true,
    })
  );
  expect(store.getState().registerRyokan.convenienceServices.gym).toEqual(true);

  // 자구지
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'jacuzzi',
      serviceValue: true,
    })
  );
  expect(store.getState().registerRyokan.convenienceServices.jacuzzi).toEqual(
    true
  );

  // 주차장
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'parkingLot',
      serviceValue: true,
    })
  );
  expect(
    store.getState().registerRyokan.convenienceServices.parkingLot
  ).toEqual(true);

  // 수영장
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'swimmingPool',
      serviceValue: true,
    })
  );
  expect(
    store.getState().registerRyokan.convenienceServices.swimmingPool
  ).toEqual(true);

  // 세탁기
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'washingMachine',
      serviceValue: true,
    })
  );
  expect(
    store.getState().registerRyokan.convenienceServices.washingMachine
  ).toEqual(true);

  // 정원
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'garden',
      serviceValue: true,
    })
  );
  expect(store.getState().registerRyokan.convenienceServices.garden).toEqual(
    true
  );

  // TODO 숙소의 편의공간들의 값을 false로 바꿈.

  // 헬스장 false
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'gym',
      serviceValue: false,
    })
  );
  expect(store.getState().registerRyokan.convenienceServices.gym).toEqual(
    false
  );

  // 자구지 false
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'jacuzzi',
      serviceValue: false,
    })
  );
  expect(store.getState().registerRyokan.convenienceServices.jacuzzi).toEqual(
    false
  );

  // 주차장 false
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'parkingLot',
      serviceValue: false,
    })
  );
  expect(
    store.getState().registerRyokan.convenienceServices.parkingLot
  ).toEqual(false);

  // 수영장 false
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'swimmingPool',
      serviceValue: false,
    })
  );
  expect(
    store.getState().registerRyokan.convenienceServices.swimmingPool
  ).toEqual(false);

  // 세탁기 false
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'washingMachine',
      serviceValue: false,
    })
  );
  expect(
    store.getState().registerRyokan.convenienceServices.washingMachine
  ).toEqual(false);

  // 정원
  store.dispatch(
    registerRyokanActions.setConvenienceServices({
      serviceKey: 'garden',
      serviceValue: false,
    })
  );
  expect(store.getState().registerRyokan.convenienceServices.garden).toEqual(
    false
  );
});

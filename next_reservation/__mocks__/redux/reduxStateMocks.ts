import { RootState, useMockStore } from '../../store/index';
import * as customSelecor from '../../store/index';
import userDefaultProfilePicture from '../../public/static/user/default_user_picture.png';

type mockStoreType = RootState;

const store = useMockStore;
const dispatchMock = jest.fn(store.dispatch);
store.dispatch = dispatchMock;

export let useSelectorMock = jest.spyOn(customSelecor, 'useSelector');
export let useDispatchMock = dispatchMock;

export const mockStoreValue: mockStoreType = {
  user: {
    signUpForm: {
      email: '',
      name: '',
      year: '',
      month: '',
      day: '',
      password: '',
      userPicture: userDefaultProfilePicture,
    },
    loginForm: {
      email: '',
      password: '',
    },
    data: {
      type: '',
      email: '',
      brithDay: '',
      name: '',
      userPicture: userDefaultProfilePicture,
      token: '',
    },
    error: {
      type: '',
      code: '',
      message: '',
    },
    logged: false,
  },
  ryokanForm: {
    option: { isEdit: false, ryokanId: '' },
    buildingType: '',
    ryokanType: '',
    isBuiltInOnsen: false,
    bedrooms: {
      bedroomCount: 0,
      bedroomList: { bedroom0: [{ bedType: '', count: 0 }] },
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
    date: {
      openDate: null,
      closeDate: null,
    },
  },
  registerIsValid: { isValid: false },
  modalState: { modalState: false },
  loading: false,
  searchRoom: {
    location: '',
    latitude: 0,
    longitude: 0,
    checkInDate: null,
    checkOutDate: null,
    adultCount: 0,
    childrenCount: 0,
    infantsCount: 0,
  },
  searchResultRyokan: {
    searchResult: [],
    filter: {
      filterConvenienceSpaces: {
        gym: false,
        garden: false,
        jacuzzi: false,
        swimmingPool: false,
        parkingLot: false,
        washingMachine: false,
      },
      filterPricePerDay: { min: 0, max: 500000 },
      filterRyokanType: '',
    },
  },
  ryokanDetail: {
    id: '',
    ryokanType: '',
    buildingType: '',
    isBuiltInOnsen: false,
    bedrooms: {
      bedroomList: { bedroom0: [] },
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
  reservation: {
    ryokanId: '',
    adultCount: 0,
    childrenCount: 0,
    infantsCount: 0,
    startDate: '',
    endDate: '',
  },
  myReservations: [],
  isRendered: false,
};

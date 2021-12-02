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
      brithDay: new Date(),
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
  registerRyokan: {
    buildingType: '',
    ryokanType: '',
    isBuiltInOnsen: false,
    bedrooms: {
      bedroomCount: 0,
      bedroomList: [[{ bedType: '', count: 0 }]],
      personnel: 0,
    },
    bathrooms: {
      bathCount: 0,
      isShared: false,
    },
    location: {
      contry: '',
      city: '',
      district: '',
      streetAddress: '',
      detailAddress: '',
      postCode: '',
      latitude: 0,
      longitude: 0,
    },
  },
  registerIsValid: { isValid: false },
};

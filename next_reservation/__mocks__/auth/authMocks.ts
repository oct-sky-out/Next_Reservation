import { useMockStore } from '../../store/index';
import * as customSelecor from '../../store/index';
import {
  IFirebaseSignInError,
  IFirebaseSignInResult,
  IFirebaseSignUpError,
  IFirebaseSignUpResult,
  SignInFormType,
  SignUpFormType,
} from 'types/reduxActionTypes/ReduxUserActionTypes';
import userDefaultProfilePicture from '../../public/static/user/default_user_picture.png';

const store = useMockStore;
const dispatchMock = jest.fn(store.dispatch);
store.dispatch = dispatchMock;

export let useSelectorMock = jest.spyOn(customSelecor, 'useSelector');
export let useDispatchMock = dispatchMock;

export const mockStoreValue: {
  signUpForm: SignUpFormType;
  loginForm: SignInFormType;
  data: IFirebaseSignInResult | IFirebaseSignUpResult;
  error: IFirebaseSignInError | IFirebaseSignUpError;
  logged: boolean;
} = {
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
};

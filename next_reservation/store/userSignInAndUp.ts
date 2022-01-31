import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFirebaseSignInError,
  IFirebaseSignInResult,
  IFirebaseSignUpError,
  IFirebaseSignUpResult,
  ISignInForm,
  ISignUpForm,
} from '../types/reduxActionTypes/ReduxUserActionTypes';

const initialState: {
  signUpForm: ISignUpForm;
  loginForm: ISignInForm;
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
    userPicture: { src: '', height: 0, width: 0 },
  },
  loginForm: {
    email: '',
    password: '',
  },
  data: {
    type: '',
    email: '',
    brithDay: null,
    name: '',
    userPicture: { src: '', height: 0, width: 0 },
    token: '',
  },
  error: {
    type: '',
    code: '',
    message: '',
  },
  logged: false,
};

const userSignInSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignUp: {
      reducer: (state, action: PayloadAction<ISignUpForm>) => {
        return { ...state, signUpForm: action.payload };
      },
      prepare: (signUpForm: ISignUpForm) => {
        return { payload: signUpForm };
      },
    },
    userSignIn: {
      reducer: (state, action: PayloadAction<ISignInForm>) => {
        return { ...state, loginForm: { ...action.payload } };
      },
      prepare: (loginForm: ISignInForm) => {
        return { payload: loginForm };
      },
    },
    userSignInOrUpSuccess: {
      reducer: (
        state,
        action: PayloadAction<IFirebaseSignInResult | IFirebaseSignUpResult>
      ) => {
        return {
          ...state,
          loginForm: { ...state.loginForm, password: '' },
          data: action.payload,
        };
      },
      prepare: (data: IFirebaseSignInResult) => {
        return { payload: data };
      },
    },
    userSignInOrFailure: {
      reducer: (
        state,
        action: PayloadAction<IFirebaseSignInError | IFirebaseSignUpError>
      ) => {
        return {
          ...state,
          loginForm: { ...state.loginForm, password: '' },
          error: action.payload,
        };
      },
      prepare: (error: IFirebaseSignInError) => {
        return { payload: error };
      },
    },
    setLogeed: {
      reducer: (state, action: PayloadAction<boolean>) => {
        return {
          ...state,
          logged: action.payload,
        };
      },
      prepare: (islogged: boolean) => {
        return { payload: islogged };
      },
    },
  },
});

const { actions } = userSignInSlice;

export const userSignInAndUpActions = actions;

export default userSignInSlice;

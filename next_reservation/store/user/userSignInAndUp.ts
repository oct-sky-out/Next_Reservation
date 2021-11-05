import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFirebaseSignInError,
  IFirebaseSignInResult,
  IFirebaseSignUpError,
  IFirebaseSignUpResult,
  SignInFormType,
  SignUpFormType,
} from '../../types/reduxActionTypes/ReduxUserActionTypes';

const initialState: {
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
    userPicture: { src: '', height: 0, width: 0 },
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
      reducer: (state, action: PayloadAction<SignUpFormType>) => {
        return (state = { ...state, signUpForm: action.payload });
      },
      prepare: (signUpForm: SignUpFormType) => {
        return { payload: signUpForm };
      },
    },
    userSignIn: {
      reducer: (state, action: PayloadAction<SignInFormType>) => {
        return (state = { ...state, loginForm: { ...action.payload } });
      },
      prepare: (loginForm: SignInFormType) => {
        return { payload: loginForm };
      },
    },
    userSignInOrUpSuccess: {
      reducer: (
        state,
        action: PayloadAction<IFirebaseSignInResult | IFirebaseSignUpResult>
      ) => {
        return (state = {
          ...state,
          loginForm: { ...state.loginForm, password: '' },
          data: action.payload,
          logged: true,
        });
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
        return (state = {
          ...state,
          loginForm: { ...state.loginForm, password: '' },
          error: action.payload,
        });
      },
      prepare: (error: IFirebaseSignInError) => {
        return { payload: error };
      },
    },
    setLogeed: {
      reducer: (state, action: PayloadAction<boolean>) => {
        return (state = {
          ...state,
          logged: action.payload,
        });
      },
      prepare: (islogged: boolean) => {
        return { payload: islogged };
      },
    },
  },
});

const { actions, reducer } = userSignInSlice;

export const userSignInAndUpActions = actions;

export default userSignInSlice;

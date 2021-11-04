import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFirebaseSignInError,
  IFirebaseSignInResult,
} from 'pages/api/auth/FirebaseSignIn';
import {
  IFirebaseSignUpError,
  IFirebaseSignUpResult,
} from 'pages/api/auth/FirebaseSignUp';

export type LoginFormType = { email: string; password: string };

const initialState: {
  loginForm: LoginFormType;
  data: IFirebaseSignInResult;
  error: IFirebaseSignInError;
  logged: boolean;
} = {
  loginForm: {
    email: '',
    password: '',
  },
  data: {
    type: '',
    email: '',
    brithDay: 0,
    name: '',
    userPicture: new Object(null),
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
    userSignIn: {
      reducer: (state, action: PayloadAction<LoginFormType>) => {
        return (state = { ...state, loginForm: { ...action.payload } });
      },
      prepare: (loginForm: LoginFormType) => {
        return { payload: loginForm };
      },
    },
    userSignInSuccess: {
      reducer: (state, action: PayloadAction<IFirebaseSignInResult>) => {
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
    userSignInFailure: {
      reducer: (state, action: PayloadAction<IFirebaseSignInError>) => {
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

export const userSignInActions = actions;

export default reducer;

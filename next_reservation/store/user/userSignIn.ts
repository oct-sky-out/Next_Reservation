import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFirebaseSignInError,
  IFirebaseSignInResult,
} from 'pages/api/auth/FirebaseSignIn';

export type LoginFormType = { email: string; password: string };

const initialState: {
  loginForm: LoginFormType;
  data: IFirebaseSignInResult;
  error: IFirebaseSignInError;
} = {
  loginForm: {
    email: '',
    password: '',
  },
  data: {
    type: '',
    email: '',
    isLogged: false,
  },
  error: {
    type: '',
    code: '',
    message: '',
  },
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
  },
});

const { actions, reducer } = userSignInSlice;

export const userSignInActions = actions;

export default reducer;

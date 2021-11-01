import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFirebaseSignUpError,
  IFirebaseSignUpResult,
} from '../../pages/api/auth/FirebaseSignUp';

const initialState: {
  data: IFirebaseSignUpResult;
} = {
  data: {
    type: '',
    email: '',
    isLogged: false,
  },
};

const userSignUpSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignUpSuccess: {
      reducer: (state, action: PayloadAction<IFirebaseSignUpResult>) => {
        state = {
          ...state,
          data: { ...action.payload },
        };
        return state;
      },
      prepare: (data: IFirebaseSignUpResult) => {
        return {
          payload: data,
        };
      },
    },
  },
});

const { actions, reducer } = userSignUpSlice;
export const userAction = { ...actions };

export default reducer;

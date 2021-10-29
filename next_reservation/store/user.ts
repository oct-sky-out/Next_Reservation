import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types/reduxType';

const initialState: UserState = {
  email: '',
  name: '',
  brithDay: '',
  userPicture: '',
  isLogged: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<UserState>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
  },
});

export const userAction = { ...user.actions };

export default user;

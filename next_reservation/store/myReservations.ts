import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyReservations } from '../types/reduxActionTypes/ReduxMyReservaitonType';

const initialState: MyReservations = [];

const myReservationsSlice = createSlice({
  name: 'myReservation',
  initialState,
  reducers: {
    initReservations: (_state, _action: PayloadAction<void>) => [],
    setReservations: (_state, action: PayloadAction<MyReservations>) => [
      ...action.payload,
    ],
  },
});

export const myReservationsActions = myReservationsSlice.actions;
export default myReservationsSlice;

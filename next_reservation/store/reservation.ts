import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReservation } from '@/types/reduxActionTypes/ReduxReservationType';

const initialState: IReservation = {
  ryoknaId: '',
  adultCount: 0,
  childrenCount: 0,
  infantsCount: 0,
  startDate: new Date(),
  endDate: new Date(),
};

const reservationSlice = createSlice({
  initialState,
  name: 'reservation',
  reducers: {
    setAdultCount: (state, action: PayloadAction<number>) => ({
      ...state,
      adultCount: action.payload,
    }),
    setChildrenCount: (state, action: PayloadAction<number>) => ({
      ...state,
      childrenCount: action.payload,
    }),
    setInfantsCount: (state, action: PayloadAction<number>) => ({
      ...state,
      infantsCount: action.payload,
    }),
    setDate: (
      state,
      action: PayloadAction<{ startDate: Date; endDate: Date }>
    ) => ({
      ...state,
      startDate: action.payload.startDate,
      endDate: action.payload.endDate,
    }),
    setStartDate: (state, action: PayloadAction<Date>) => ({
      ...state,
      startDate: action.payload,
    }),
    setEndDate: (state, action: PayloadAction<Date>) => ({
      ...state,
      endDate: action.payload,
    }),
    setRyokanId: (state, action: PayloadAction<string>) => ({
      ...state,
      ryokanId: action.payload,
    }),
  },
});

const { actions } = reservationSlice;

export const reservationActions = actions;

export default reservationSlice;

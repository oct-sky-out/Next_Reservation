import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReservation } from '@/types/reduxActionTypes/ReduxReservationType';

const initialState: IReservation = {
  ryokanId: '',
  adultCount: 0,
  childrenCount: 0,
  infantsCount: 0,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
};

const reservationSlice = createSlice({
  initialState,
  name: 'reservation',
  reducers: {
    setPeopleCount: (
      state,
      action: PayloadAction<{
        adultCount: number;
        childrenCount: number;
        infantsCount: number;
      }>
    ) => ({
      ...state,
      adultCount: action.payload.adultCount,
      childrenCount: action.payload.childrenCount,
      infantsCount: action.payload.infantsCount,
    }),
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
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => ({
      ...state,
      startDate: action.payload.startDate,
      endDate: action.payload.endDate,
    }),
    setStartDate: (state, action: PayloadAction<string>) => ({
      ...state,
      startDate: action.payload,
    }),
    setEndDate: (state, action: PayloadAction<string>) => ({
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

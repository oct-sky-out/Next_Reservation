import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchRoom } from '@/types/reduxActionTypes/ReduxSearchRoomType';

const initialState: ISearchRoom = {
  location: '',
  latitude: 0,
  longitude: 0,
  checkInDate: null,
  checkOutDate: null,
  adultCount: 0,
  childernCount: 0,
  infantsCount: 0,
};

const searchRoomSlice = createSlice({
  name: 'searchRoom',
  initialState,
  reducers: {
    setLocation: {
      prepare: (location: string) => ({ payload: location }),
      reducer: (state, action: PayloadAction<string>) => ({
        ...state,
        location: action.payload,
      }),
    },
    setMyPosition: {
      prepare: (position: { latitude: number; longitude: number }) => ({
        payload: position,
      }),
      reducer: (
        state,
        action: PayloadAction<{ latitude: number; longitude: number }>
      ) => ({
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      }),
    },
    setLatitude: {
      prepare: (latitude: number) => ({ payload: latitude }),
      reducer: (state, action: PayloadAction<number>) => ({
        ...state,
        latitude: action.payload,
      }),
    },
    setLongitude: {
      prepare: (longitude: number) => ({ payload: longitude }),
      reducer: (state, action: PayloadAction<number>) => ({
        ...state,
        longitude: action.payload,
      }),
    },
    setCheckInDate: {
      prepare: (checkInDate: Date) => ({ payload: checkInDate }),
      reducer: (state, action: PayloadAction<Date>) => ({
        ...state,
        checkInDate: action.payload,
      }),
    },
    setCheckOutDate: {
      prepare: (checkOutDate: Date) => ({ payload: checkOutDate }),
      reducer: (state, action: PayloadAction<Date>) => ({
        ...state,
        checkOutDate: action.payload,
      }),
    },
    setAdultCount: {
      prepare: (adultCount: number) => ({ payload: adultCount }),
      reducer: (state, action: PayloadAction<number>) => ({
        ...state,
        adultCount: action.payload,
      }),
    },
    setChildernCount: {
      prepare: (childernCount: number) => ({ payload: childernCount }),
      reducer: (state, action: PayloadAction<number>) => ({
        ...state,
        childernCount: action.payload,
      }),
    },
    setInfantsCount: {
      prepare: (infantsCount: number) => ({ payload: infantsCount }),
      reducer: (state, action: PayloadAction<number>) => ({
        ...state,
        infantsCount: action.payload,
      }),
    },
  },
});

const { actions } = searchRoomSlice;

export const searchRoomActions = actions;

export default searchRoomSlice;

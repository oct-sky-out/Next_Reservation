import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { modalState: false };

const modalOpenStateSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenState: {
      prepare: (openState: boolean) => {
        return { payload: openState };
      },
      reducer: (state, action: PayloadAction<boolean>) => {
        return { ...state, modalState: action.payload };
      },
    },
  },
});

export const modalOpenStateAction = modalOpenStateSlice.actions;
export default modalOpenStateSlice;

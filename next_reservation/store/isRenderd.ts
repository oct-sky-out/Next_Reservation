import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false;

const isRenderdSlice = createSlice({
  name: 'isRenderd',
  initialState,
  reducers: {
    setRendered: {
      prepare: (openState: boolean) => {
        return { payload: openState };
      },
      reducer: (_state, action: PayloadAction<boolean>) => {
        return action.payload;
      },
    },
  },
});

export const isRenderdAction = isRenderdSlice.actions;
export default isRenderdSlice;

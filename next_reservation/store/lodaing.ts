import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: {
      prepare: (openState: boolean) => {
        return { payload: openState };
      },
      reducer: (_state, action: PayloadAction<boolean>) => {
        return action.payload;
      },
    },
  },
});

export const loadingAction = loadingSlice.actions;
export default loadingSlice;

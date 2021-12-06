import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { isValid: false };

const registerFormValidSlice = createSlice({
  name: 'valid',
  initialState,
  reducers: {
    setValid: {
      prepare: (isValid: boolean) => {
        return { payload: isValid };
      },
      reducer: (state, action: PayloadAction<boolean>) => {
        return { ...state, isValid: action.payload };
      },
    },
  },
});

export const registerFormValidAction = registerFormValidSlice.actions;
export default registerFormValidSlice;

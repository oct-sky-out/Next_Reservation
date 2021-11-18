import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IRyokanType,
  bedroomType,
} from '../types/reduxActionTypes/ReduxRegiserRyokanType';

const initialState: IRyokanType = {
  ryokanType: '',
  buildingType: '',
  isBuiltInOnsen: false,
  bedrooms: {
    bedroomList: [[{ bedType: '', count: 0 }], [{ bedType: '', count: 0 }]],
    bedroomCount: 0,
    personnel: 0,
  },
};

const registerRyokanSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRyokanType: {
      prepare: (ryokanType: string) => {
        return { payload: ryokanType };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, ryokanType: action.payload };
      },
    },
    setBuildingType: {
      prepare: (buildingType: string) => {
        return { payload: buildingType };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, buildingType: action.payload };
      },
    },
    setIsBuiltInOnsen: {
      prepare: (isBuiltInOnsen: boolean) => {
        return { payload: isBuiltInOnsen };
      },
      reducer: (state, action: PayloadAction<boolean>) => {
        return { ...state, isBuiltInOnsen: action.payload };
      },
    },
    setPersonnel: {
      prepare: (personnelCount: number) => {
        return { payload: personnelCount };
      },
      reducer: (state, action: PayloadAction<number>) => {
        return {
          ...state,
          bedrooms: { ...state.bedrooms, personnel: action.payload },
        };
      },
    },
    setBedroomCount: {
      prepare: (bedroomCount: number) => {
        return { payload: bedroomCount };
      },
      reducer: (state, action: PayloadAction<number>) => {
        const bedroomList =
          action.payload > state.bedrooms.bedroomList.length
            ? [...state.bedrooms.bedroomList].concat(
                [
                  ...Array(action.payload - state.bedrooms.bedroomList.length),
                ].fill([{ bedType: '', count: 0 }])
              )
            : [...state.bedrooms.bedroomList.slice(0, action.payload)];

        return {
          ...state,
          bedrooms: {
            ...state.bedrooms,
            bedroomCount: action.payload,
            bedroomList,
          },
        };
      },
    },
    setBedroomList: {
      prepare: (bedrooms: { bedrooms: bedroomType[]; index: number }) => {
        return { payload: bedrooms };
      },
      reducer: (
        state,
        action: PayloadAction<{ bedrooms: bedroomType[]; index: number }>
      ) => {
        const bedroomList = [...state.bedrooms.bedroomList];
        bedroomList[action.payload.index] = action.payload.bedrooms;
        return {
          ...state,
          bedrooms: {
            ...state.bedrooms,
            bedroomList,
          },
        };
      },
    },
  },
});

const { actions } = registerRyokanSlice;

export const registerRyokanActions = actions;
export default registerRyokanSlice;

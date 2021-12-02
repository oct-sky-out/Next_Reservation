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
    bedroomList: [[{ bedType: 'single', count: 0 }]],
    bedroomCount: 1,
    personnel: 0,
  },
  bathrooms: {
    bathCount: 0,
    isShared: false,
  },
  location: {
    contry: '',
    city: '',
    district: '',
    streetAddress: '',
    detailAddress: '',
    postCode: '',
    latitude: 0,
    longitude: 0,
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
        return {
          ...state,
          bedrooms: {
            ...state.bedrooms,
            bedroomCount: action.payload,
          },
        };
      },
    },
    setBedroomList: {
      prepare: (bedrooms: { bedrooms: bedroomType[][] }) => {
        return { payload: bedrooms };
      },
      reducer: (
        state,
        action: PayloadAction<{ bedrooms: bedroomType[][] }>
      ) => {
        return {
          ...state,
          bedrooms: {
            ...state.bedrooms,
            bedroomList: action.payload.bedrooms,
          },
        };
      },
    },
    setBedroom: {
      prepare: (bedroom: { bedroom: bedroomType[]; roomNumber: number }) => {
        return { payload: bedroom };
      },
      reducer: (
        state,
        action: PayloadAction<{ bedroom: bedroomType[]; roomNumber: number }>
      ) => {
        const bedroomList = [...state.bedrooms.bedroomList];
        bedroomList[action.payload.roomNumber] = action.payload.bedroom;

        return {
          ...state,
          bedrooms: {
            ...state.bedrooms,
            bedroomList,
          },
        };
      },
    },
    setBathCount: {
      prepare: (bathCount: number) => {
        return { payload: bathCount };
      },
      reducer: (state, action: PayloadAction<number>) => {
        return {
          ...state,
          bathrooms: { ...state.bathrooms, bathCount: action.payload },
        };
      },
    },
    setIsBathShared: {
      prepare: (isShared: boolean) => {
        return { payload: isShared };
      },
      reducer: (state, action: PayloadAction<boolean>) => {
        return {
          ...state,
          bathrooms: { ...state.bathrooms, isShared: action.payload },
        };
      },
    },
    setContry: {
      prepare: (contry: string) => {
        return { payload: contry };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          location: { ...state.location, contry: action.payload },
        };
      },
    },
    setCity: {
      prepare: (city: string) => {
        return { payload: city };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          location: { ...state.location, city: action.payload },
        };
      },
    },
    setDistrict: {
      prepare: (district: string) => {
        return { payload: district };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          location: { ...state.location, district: action.payload },
        };
      },
    },
    setStreetAddress: {
      prepare: (streetAddress: string) => {
        return { payload: streetAddress };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          location: { ...state.location, streetAddress: action.payload },
        };
      },
    },
    setDetailAddress: {
      prepare: (detailAddress: string) => {
        return { payload: detailAddress };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          location: { ...state.location, detailAddress: action.payload },
        };
      },
    },
    setPostCode: {
      prepare: (postCode: string) => {
        return { payload: postCode };
      },
      reducer: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          location: { ...state.location, postCode: action.payload },
        };
      },
    },
    setLatitude: {
      prepare: (latitude: number) => {
        return { payload: latitude };
      },
      reducer: (state, action: PayloadAction<number>) => {
        return {
          ...state,
          location: { ...state.location, latitude: action.payload },
        };
      },
    },
    setLongitude: {
      prepare: (longitude: number) => {
        return { payload: longitude };
      },
      reducer: (state, action: PayloadAction<number>) => {
        return {
          ...state,
          location: { ...state.location, longitude: action.payload },
        };
      },
    },
  },
});

const { actions } = registerRyokanSlice;

export const registerRyokanActions = actions;
export default registerRyokanSlice;

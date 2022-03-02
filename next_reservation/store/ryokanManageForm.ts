import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RyokanMangeFormType } from '@/types/reduxActionTypes/ReduxRyokanMangeFormType';

const initialState: RyokanMangeFormType = {
  ryokanId: '',
  ryokanData: {
    ryokanManager: '',
    ryokanType: '',
    buildingType: '',
    isBuiltInOnsen: false,
    bedrooms: {
      bedroomList: { bedroom0: [{ bedType: 'single', count: 0 }] },
      bedroomCount: 1,
      personnel: 0,
    },
    bathrooms: {
      bathCount: 0,
      isShared: false,
    },
    location: {
      contry: '',
      address: '',
      detailAddress: '',
      postCode: '',
      latitude: 0,
      longitude: 0,
    },
    amenities: {
      breakfast: false,
      closet: false,
      coolingEquipment: false,
      heatingEquipment: false,
      internet: false,
      toiletries: false,
      hairdryer: false,
      tv: false,
    },
    convenienceSpaces: {
      gym: false,
      jacuzzi: false,
      parkingLot: false,
      swimmingPool: false,
      washingMachine: false,
      garden: false,
    },
    photos: [],
    title: '',
    description: '',
    pricePerDay: '',
    date: { openDate: null, closeDate: null },
  },
};

const ryokanManageFormSlice = createSlice({
  name: 'ryokanDetail',
  initialState,
  reducers: {
    initManageForm: (_state, _action: PayloadAction<void>) => ({
      ...initialState,
    }),
    setRyokanId: (
      state,
      action: PayloadAction<Omit<RyokanMangeFormType, 'ryokanData'>>
    ) => ({ ...state, ryokanId: action.payload.ryokanId }),
    setManageRyokan: (
      state,
      action: PayloadAction<Omit<RyokanMangeFormType, 'ryokanId'>>
    ) => ({ ...state, ryokanData: action.payload.ryokanData }),
  },
});

const { actions } = ryokanManageFormSlice;

export const ryokanManageFormActions = actions;

export default ryokanManageFormSlice;

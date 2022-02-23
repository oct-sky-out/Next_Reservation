import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RyokanSearchResultType } from '@/types/reduxActionTypes/ReduxSearchResultsRyokans';

const initialState: RyokanSearchResultType = {
  id: '',
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
};

const ryokanDetailSlice = createSlice({
  name: 'ryokanDetail',
  initialState,
  reducers: {
    initDetail: (_state, _action: PayloadAction<void>) => ({ ...initialState }),
    setRyokanDetail: (
      _state,
      action: PayloadAction<RyokanSearchResultType>
    ) => ({
      ...action.payload,
    }),
  },
});

const { actions } = ryokanDetailSlice;

export const ryokanDetailActions = actions;

export default ryokanDetailSlice;

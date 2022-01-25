import { convenienceSpacesType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import { ISearchResultRyokan } from '@/types/reduxActionTypes/ReduxSearchResultsRyokans';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ISearchResultRyokan = {
  searchResult: [],
  filter: {
    filterConvenienceSpaces: {
      gym: false,
      jacuzzi: false,
      parkingLot: false,
      swimmingPool: false,
      washingMachine: false,
      garden: false,
    },
    filterPricePerDay: { min: 0, max: 1000000 },
    filterRyokanType: '',
  },
};

const searchResultsRoomsSlice = createSlice({
  initialState,
  name: 'searchResultsRooms',
  reducers: {
    setSearchResults: (
      state,
      action: PayloadAction<Omit<ISearchResultRyokan, 'filter'>>
    ) => ({
      ...state,
      searchResult: [...state.searchResult, ...action.payload.searchResult],
    }),
    setFilterPricePerDay: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => ({
      ...state,
      filter: { ...state.filter, filterPricePerDay: action.payload },
    }),
    setFilterRyokanType: (state, action: PayloadAction<string>) => ({
      ...state,
      filter: { ...state.filter, filterRyokanType: action.payload },
    }),
    setFilterConvenienceSpace: (
      state,
      action: PayloadAction<convenienceSpacesType>
    ) => ({
      ...state,
      filter: { ...state.filter, filterConvenienceSpaces: action.payload },
    }),
  },
});

const { actions } = searchResultsRoomsSlice;

export const registerRyokanActions = actions;

export default searchResultsRoomsSlice;

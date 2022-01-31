import { convenienceSpacesType } from '@/types/reduxActionTypes/ReduxRegiserRyokanType';
import { ISearchResultRyokan } from '@/types/reduxActionTypes/ReduxSearchResultsRyokans';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ISearchResultRyokan = {
  filter: {
    filterConvenienceSpaces: [],
    filterPricePerDay: { min: 0, max: 500000 },
    filterRyokanType: '',
  },
};

const searchResultsRoomsSlice = createSlice({
  initialState,
  name: 'searchResultsRooms',
  reducers: {
    setFilterMinPricePerDay: (state, action: PayloadAction<number>) => ({
      ...state,
      filter: {
        ...state.filter,
        filterPricePerDay: {
          ...state.filter.filterPricePerDay,
          min: action.payload,
        },
      },
    }),
    setFilterMaxPricePerDay: (state, action: PayloadAction<number>) => ({
      ...state,
      filter: {
        ...state.filter,
        filterPricePerDay: {
          ...state.filter.filterPricePerDay,
          max: action.payload,
        },
      },
    }),
    setFilterRyokanType: (state, action: PayloadAction<string>) => ({
      ...state,
      filter: { ...state.filter, filterRyokanType: action.payload },
    }),
    setFilterConvenienceSpace: (
      state,
      action: PayloadAction<Array<keyof convenienceSpacesType>>
    ) => ({
      ...state,
      filter: { ...state.filter, filterConvenienceSpaces: action.payload },
    }),
  },
});

const { actions } = searchResultsRoomsSlice;

export const searchResultsRoomsActions = actions;

export default searchResultsRoomsSlice;

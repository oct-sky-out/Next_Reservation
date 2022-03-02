import { convenienceSpacesType } from '@/types/reduxActionTypes/ReduxRyokanType';
import {
  ISearchResultRyokan,
  RyokanSearchResultType,
} from '@/types/reduxActionTypes/ReduxSearchResultsRyokans';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ISearchResultRyokan = {
  searchResult: [],
  filter: {
    filterConvenienceSpaces: {
      gym: false,
      garden: false,
      jacuzzi: false,
      swimmingPool: false,
      parkingLot: false,
      washingMachine: false,
    },
    filterPricePerDay: { min: 0, max: 500000 },
    filterRyokanType: '',
  },
};

const searchResultsRoomsSlice = createSlice({
  initialState,
  name: 'searchResultsRooms',
  reducers: {
    initFilter: (state, _action: PayloadAction<void>) => ({
      ...state,
      filter: {
        filterConvenienceSpaces: {
          gym: false,
          garden: false,
          jacuzzi: false,
          swimmingPool: false,
          parkingLot: false,
          washingMachine: false,
        },
        filterPricePerDay: { min: 0, max: 500000 },
        filterRyokanType: '',
      },
    }),
    setSearchResult: (
      state,
      action: PayloadAction<RyokanSearchResultType[]>
    ) => ({
      ...state,
      searchResult: action.payload,
    }),
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
      action: PayloadAction<convenienceSpacesType>
    ) => ({
      ...state,
      filter: { ...state.filter, filterConvenienceSpaces: action.payload },
    }),
  },
});

const { actions } = searchResultsRoomsSlice;

export const searchResultsRoomsActions = actions;

export default searchResultsRoomsSlice;

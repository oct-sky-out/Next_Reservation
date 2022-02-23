import {
  amenitiesType,
  convenienceSpacesType,
  IRyokanType,
} from './ReduxRegiserRyokanType';

export type SearchResultRyokanOfBedroomType = {
  people: number;
  bedroomCount: number;
  bedCount: number;
};

export type RyokanInformationType = {
  bedrooms: SearchResultRyokanOfBedroomType;
  bathroomCount: number;
  amenities: amenitiesType;
  convenienceSpaces: convenienceSpacesType;
};

export type RyokanSearchResultType = IRyokanType & { id: string };

export interface ISearchResultRyokan {
  searchResult: RyokanSearchResultType[];
  filter: {
    filterConvenienceSpaces: convenienceSpacesType;
    filterPricePerDay: { min: number; max: number };
    filterRyokanType: string; // * 료칸타입은 3가지 Japanese | Western Western | Japanese-Western
  };
}

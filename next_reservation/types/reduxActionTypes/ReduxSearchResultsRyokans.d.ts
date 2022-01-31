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

export interface ISearchResultRyokan {
  filter: {
    filterConvenienceSpaces: Array<keyof convenienceSpacesType>;
    filterPricePerDay: { min: number | null; max: number | null };
    filterRyokanType: string; // * 료칸타입은 3가지 Japanese | Western Western | Japanese-Western
  };
}

import { amenitiesType, convenienceSpacesType } from './ReduxRegiserRyokanType';

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
  searchResult: {
    imageUrl: string;
    title: string;
    ryokanInformation: RyokanInformationType;
    pricePerDay: number;
  }[];
  filter: {
    filterConvenienceSpaces?: Array<keyof convenienceSpacesType>;
    filterPricePerDay?: { min: number; max: number };
    filterRyokanType?: string; // * 료칸타입은 3가지 Japanese | Western Western | Japanese-Western
  };
}

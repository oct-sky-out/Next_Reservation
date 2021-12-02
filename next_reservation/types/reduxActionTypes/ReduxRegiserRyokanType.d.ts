export type bedroomType = { bedType: string; count: number };

export interface IRyokanType {
  ryokanType: string;
  buildingType: string;
  isBuiltInOnsen: boolean;
  bedrooms: {
    bedroomList: bedroomType[][];
    bedroomCount: number;
    personnel: number;
  };
  bathrooms: {
    bathCount: number;
    isShared: boolean;
  };
  location: {
    contry: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postCode: string;
    latitude: number;
    longitude: number;
  };
}

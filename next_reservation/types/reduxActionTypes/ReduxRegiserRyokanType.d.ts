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
}

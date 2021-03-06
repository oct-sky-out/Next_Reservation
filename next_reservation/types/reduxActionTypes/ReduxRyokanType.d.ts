import { Timestamp } from '@firebase/firestore';

export type bedroomType = { bedType: string; count: number };

export type amenitiesType = {
  breakfast: boolean;
  closet: boolean;
  coolingEquipment: boolean;
  heatingEquipment: boolean;
  internet: boolean;
  toiletries: boolean;
  hairdryer: boolean;
  tv: boolean;
};

export type convenienceSpacesType = {
  gym: boolean;
  jacuzzi: boolean;
  parkingLot: boolean;
  swimmingPool: boolean;
  washingMachine: boolean;
  garden: boolean;
};

export type photoType = {
  photoUrl: string;
  photoName: string;
};

export type editOption = {
  isEdit: boolean;
  ryokanId: string;
};

export interface IRyokanType {
  ryokanType: string;
  buildingType: string;
  isBuiltInOnsen: boolean;
  bedrooms: {
    bedroomList: { [key: string]: bedroomType[] };
    bedroomCount: number;
    personnel: number;
  };
  bathrooms: {
    bathCount: number;
    isShared: boolean;
  };
  location: {
    contry: string;
    address: string;
    detailAddress: string;
    postCode: string;
    latitude: number;
    longitude: number;
  };
  amenities: amenitiesType;
  convenienceSpaces: convenienceSpacesType;
  photos: photoType[];
  title: string;
  description: string;
  pricePerDay: string;
  date: {
    openDate: Date | null | string;
    closeDate: Date | null | string;
  };
}

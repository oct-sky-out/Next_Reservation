export interface ISearchRoom {
  location: string;
  latitude: number;
  longitude: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  adultCount: number;
  childerenCount: number;
  infantsCount: number;
}

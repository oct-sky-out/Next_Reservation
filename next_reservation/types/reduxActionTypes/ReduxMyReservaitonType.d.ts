import { reservedRyokanType } from '../apiTyps/my/myReservationsId';
import { IRyokanType } from './ReduxRegiserRyokanType';

export type MyReservation = {
  reservedRyokan: IRyokanType;
  reservedData: reservedRyokanType;
};

export type MyReservations = Array<MyReservation>;
